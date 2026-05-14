import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const pacientes = sqliteTable("pacientes", {
  id: text("id").primaryKey(), // UUID gerado localmente
  empresaId: text("empresa_id").notNull(), // Tenant ID da clínica
  nome: text("nome").notNull(),
  telefone: text("telefone"),
  // Controle de Sincronização Obrigatórios em todas as tabelas
  updatedAt: integer("updated_at").notNull(), // Epoch timestamp
  isSynced: integer("is_synced", { mode: 'boolean' }).default(false).notNull(),
  isDeleted: integer("is_deleted", { mode: 'boolean' }).default(false).notNull(),
});

export const banhos = sqliteTable("banhos", {
  id: text("id").primaryKey(),
  empresaId: text("empresa_id").notNull(),
  petId: text("pet_id").notNull(),
  data: integer("data").notNull(),
  updatedAt: integer("updated_at").notNull(),
  isSynced: integer("is_synced", { mode: 'boolean' }).default(false).notNull(),
  isDeleted: integer("is_deleted", { mode: 'boolean' }).default(false).notNull(),
});
