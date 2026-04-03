// Aguarda todo o HTML carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    const expForm = document.getElementById('expForm');
    const listaExperimentos = document.getElementById('listaExperimentos');
    const buscaInput = document.getElementById('busca');

    // 1. CARREGAR DADOS: Busca os experimentos salvos ou cria uma lista vazia
    let experimentos = JSON.parse(localStorage.getItem('experimentosLab')) || [];

    // 2. FUNÇÃO PARA RENDERIZAR A TABELA
    function renderizarTabela(dadosParaExibir = experimentos) {
        listaExperimentos.innerHTML = '';

        if (dadosParaExibir.length === 0) {
            listaExperimentos.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: #a0aec0;">
                        Nenhum experimento encontrado.
                    </td>
                </tr>`;
            return;
        }

        dadosParaExibir.forEach((exp, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; color: #2d3748;">${exp.nome}</td>
                <td><span class="badge">${exp.area}</span></td>
                <td>${exp.localizacao || 'Não informada'}</td>
                <td style="font-size: 0.9rem; color: #4a5568;">${exp.componentes || 'Nenhum item listado'}</td>
                <td>
                    <button class="btn-delete" onclick="deletarExperimento(${index})">
                        <i class="fa-solid fa-trash-can"></i> Excluir
                    </button>
                </td>
            `;
            listaExperimentos.appendChild(tr);
        });
    }

    // 3. FUNÇÃO PARA ADICIONAR NOVO EXPERIMENTO
    expForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar

        // Pega os valores digitados
        const novoExp = {
            nome: document.getElementById('nome').value,
            area: document.getElementById('area').value,
            localizacao: document.getElementById('localizacao').value,
            componentes: document.getElementById('componentes').value
        };

        // Adiciona na lista principal
        experimentos.push(novoExp);

        // Salva no LocalStorage do navegador
        localStorage.setItem('experimentosLab', JSON.stringify(experimentos));

        // Limpa o formulário
        expForm.reset();

        // Atualiza a tabela na tela
        renderizarTabela();
    });

    // 4. FUNÇÃO DE BUSCA/FILTRO
    buscaInput.addEventListener('input', (e) => {
        const termoBusca = e.target.value.toLowerCase();
        
        const experimentosFiltrados = experimentos.filter(exp => {
            return (
                exp.nome.toLowerCase().includes(termoBusca) ||
                exp.area.toLowerCase().includes(termoBusca) ||
                exp.componentes.toLowerCase().includes(termoBusca)
            );
        });

        renderizarTabela(experimentosFiltrados);
    });

    // 5. FUNÇÃO PARA DELETAR (Global para o botão funcionar)
    window.deletarExperimento = function(index) {
        if (confirm(`Tem certeza que deseja excluir o experimento "${experimentos[index].nome}"?`)) {
            experimentos.splice(index, 1); // Remove do array
            localStorage.setItem('experimentosLab', JSON.stringify(experimentos)); // Atualiza o armazenamento
            renderizarTabela(); // Atualiza a tela
        }
    }

    // Inicializa a tabela quando abre o site
    renderizarTabela();
});
