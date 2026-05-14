const dbService = require('./dbService');
const data = require('./data_export.json');

const MAPPING = {
    patients: 'pacientes',
    appointments: 'consultas',
    professionals: 'profissionais',
    clinic: 'clinic',
    transactions: 'transactions',
    messages: 'messages'
};

async function seed() {
    console.log("Iniciando importação de dados...");
    
    // Lista de todas as chaves esperadas no JSON
    const categorias = ['patients', 'appointments', 'professionals', 'clinic', 'transactions', 'messages'];
    
    for (const jsonKey of categorias) {
        const dbKey = MAPPING[jsonKey];
        const items = data[jsonKey];
        
        if (!items) {
            console.log(`Dados para ${jsonKey} não encontrados. pulando...`);
            continue;
        }
        
        // Se for objeto único (clinic), coloca em array para processamento genérico
        const itemsArray = Array.isArray(items) ? items : [items];
        
        let count = 0;
        for (const item of itemsArray) {
            await dbService.importData(dbKey, item);
            count++;
        }
        console.log(`Importados ${count} registros para ${dbKey}`);
    }
    console.log("Seeding concluído!");
}

// Executar o seeding e logar erros
seed().catch(err => console.error("Erro na importação de dados:", err));

module.exports = seed;
