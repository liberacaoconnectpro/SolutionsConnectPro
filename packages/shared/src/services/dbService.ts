import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot,
  WhereFilterOp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface QueryFilter {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
}

/**
 * Serviço genérico para operações CRUD no Firestore.
 */
export const dbService = {
  /**
   * Inicialização do banco (usado para compatibilidade)
   */
  async init(): Promise<void> {
    // No ambiente web/firebase puro, a inicialização é implícita via initializeApp
    return Promise.resolve();
  },

  /**
   * Sincronização de dados pendentes (usado para compatibilidade)
   */
  async syncPendentes(): Promise<void> {
    return Promise.resolve();
  },

  /**
   * Atalho para salvar dados (usado pelo NovoPacienteModal)
   */
  async saveData(collectionName: string, data: any): Promise<{ sucesso: boolean; id?: string; erro?: string }> {
    try {
      const id = await this.createDocument(collectionName, data);
      return { sucesso: true, id };
    } catch (error: any) {
      return { sucesso: false, erro: error.message };
    }
  },

  /**
   * Listener em tempo real para pacientes (usado pelo Dashboard e PacientesView)
   */
  listenPacientes(callback: (data: any[]) => void): () => void {
    const q = query(collection(db, 'pacientes'));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(data);
    }, (error) => {
      console.error('Erro no listener de pacientes:', error);
    });
  },

  /**
   * Busca um documento único pelo ID.
   */
  async getDocument<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (error) {
      console.error(`Erro ao buscar documento em ${collectionName}/${id}:`, error);
      throw error;
    }
  },

  /**
   * Busca uma coleção de documentos, opcionalmente aplicando filtros.
   */
  async getCollection<T>(collectionName: string, filters: QueryFilter[] = []): Promise<T[]> {
    try {
      const collectionRef = collection(db, collectionName);
      let q = query(collectionRef);

      if (filters.length > 0) {
        const whereClauses = filters.map(f => where(f.field, f.operator, f.value));
        q = query(collectionRef, ...whereClauses);
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      console.error(`Erro ao buscar coleção ${collectionName}:`, error);
      throw error;
    }
  },

  /**
   * Cria um novo documento em uma coleção.
   * Adiciona automaticamente timestamps de criação e atualização.
   */
  async createDocument<T>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error(`Erro ao criar documento em ${collectionName}:`, error);
      throw error;
    }
  },

  /**
   * Atualiza um documento existente.
   * Atualiza automaticamente o timestamp de modificação.
   */
  async updateDocument<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error(`Erro ao atualizar documento ${collectionName}/${id}:`, error);
      throw error;
    }
  },

  /**
   * Deleta um documento.
   */
  async deleteDocument(collectionName: string, id: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Erro ao deletar documento ${collectionName}/${id}:`, error);
      throw error;
    }
  }
};

/**
 * Fábrica para criar serviços especializados.
 */
const createSpecificService = <T>(collectionName: string) => ({
  get: (id: string) => dbService.getDocument<T>(collectionName, id),
  getAll: (filters?: QueryFilter[]) => dbService.getCollection<T>(collectionName, filters),
  create: (data: Omit<T, 'id'>) => dbService.createDocument<T>(collectionName, data),
  update: (id: string, data: Partial<T>) => dbService.updateDocument<T>(collectionName, id, data),
  delete: (id: string) => dbService.deleteDocument(collectionName, id)
});

// Interfaces base para os modelos (podem ser expandidas conforme necessário)
export interface Paciente { id: string; nome: string; [key: string]: any; }
export interface Agendamento { id: string; pacienteId: string; data: any; [key: string]: any; }
export interface LancamentoFinanceiro { id: string; valor: number; tipo: 'receita' | 'despesa'; [key: string]: any; }

/**
 * Serviços especializados prontos para uso.
 */
export const pacientesService = createSpecificService<Paciente>('pacientes');
export const agendamentosService = createSpecificService<Agendamento>('agendamentos');
export const financeiroService = createSpecificService<LancamentoFinanceiro>('financeiro');
