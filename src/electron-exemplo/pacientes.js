// Exemplo Vanilla JS de captura de form e comunicação via bridge (React seria semelhante em um onSubmit)

document.addEventListener('DOMContentLoaded', () => {
    carregarPacientes();

    const form = document.getElementById('formPaciente');
    
    // 5. CAPTURAR EVENTO DE SUBMIT
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Extrair dados dos campos
        const nome = document.getElementById('nome').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const genero = document.getElementById('genero').value;

        // VALIDAÇÃO 
        if (!nome || !cpf) {
            alert('Campos obrigatórios: Nome e CPF não podem estar vazios.');
            return;
        }

        // Criar o objeto conforme o anexo (o _id e datas são gerados no backend)
        const novoPaciente = {
            name: nome,
            cpf,
            phone: telefone,
            gender: genero,
            // Demais campos omitidos por simplicidade...
        };

        try {
            // ENVIAR DADOS: Transmite para o Processo Main pelo Bridge
            const resposta = await window.api.salvarDados('pacientes', novoPaciente);
            
            if (resposta.sucesso) {
                console.log('Salvo com sucesso!', resposta.dado);
                alert('Paciente salvo com sucesso!');
                
                // Limpar formulário na tela
                form.reset();
                
                // (Opcional: não precisaria recarregar manualmente porque o Real-Time entra em ação)
            } else {
                alert('Erro ao salvar no banco local: ' + resposta.erro);
            }
        } catch (error) {
            console.error('Falha ao comunicar com IPC:', error);
        }
    });

    // 3. REAÇÃO EM TEMPO REAL (Escutar o banco mudar)
    window.api.onMudancaPacientes((mudanca) => {
        console.log('Houve uma alteração local/nuvem em Pacientes:', mudanca);
        
        // A interface é notificada para se atualizar automaticamente
        // (por exemplo: chamar a lista de pacientes de novo ou append na lista HTML)
        carregarPacientes();
    });
});

async function carregarPacientes() {
    const resposta = await window.api.listarDados('pacientes');
    if(resposta.sucesso) {
        console.log('Pacientes cadastrados:', resposta.dados);
        // Lógica de renderizar tabela/lista aqui
    }
}
