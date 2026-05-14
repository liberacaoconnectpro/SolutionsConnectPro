import { db, schema } from '@connect-erp/database';
import { eq, and } from 'drizzle-orm';
import { collection, writeBatch, serverTimestamp, getDocs, query, where, doc } from 'firebase/firestore';
import { db as firestoreDb } from '@connect-erp/shared/lib/firebase';

/**
 * PUSH: Envia dados locais pendentes para a Nuvem
 */
export async function pushToCloud(empresaId: string) {
  const batch = writeBatch(firestoreDb);
  
  // 1. Busca tudo que ainda não foi sincronizado (SQLite)
  const pendentes = db.select().from(schema.pacientes).where(
      and(eq(schema.pacientes.isSynced, false), eq(schema.pacientes.empresaId, empresaId))
  ).all();

  if (pendentes.length === 0) return;

  pendentes.forEach(record => {
    // Referência do documento na nuvem por Empresa (Multi-tenant)
    const docRef = doc(firestoreDb, `empresas/${empresaId}/pacientes/${record.id}`);
    
    // Filtramos os campos de controle local
    const { isSynced, ...dataToSync } = record;
    batch.set(docRef, { ...dataToSync, fbUpdatedAt: serverTimestamp() }, { merge: true });
  });

  // 2. Comita no Firebase
  await batch.commit();

  // 3. Marca como sincronizado localmente
  const syncedIds = pendentes.map(p => p.id);
  pendentes.forEach(record => {
      db.update(schema.pacientes)
        .set({ isSynced: true })
        .where(eq(schema.pacientes.id, record.id))
        .run();
  });
}

/**
 * PULL: Puxa alterações da nuvem para o Local
 */
export async function pullFromCloud(empresaId: string, lastSyncTimestamp: number) {
  const pacientesRef = collection(firestoreDb, `empresas/${empresaId}/pacientes`);
  const q = query(pacientesRef, where('updatedAt', '>', lastSyncTimestamp));
  
  const snapshot = await getDocs(q);
  
  snapshot.forEach(docSnap => {
     const cloudData = docSnap.data();
     
     // Faz Upsert no SQLite:
     // Insere ou atualiza o dado, e já define como isSynced = true
     db.insert(schema.pacientes).values({
         id: cloudData.id,
         empresaId: cloudData.empresaId,
         nome: cloudData.nome,
         updatedAt: cloudData.updatedAt,
         isSynced: true,
         isDeleted: cloudData.isDeleted
     }).onConflictDoUpdate({
         target: schema.pacientes.id,
         set: { nome: cloudData.nome, updatedAt: cloudData.updatedAt, isSynced: true, isDeleted: cloudData.isDeleted }
     }).run();
  });
}
