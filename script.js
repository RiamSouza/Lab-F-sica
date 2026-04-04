document.addEventListener('DOMContentLoaded', () => {
    const expForm = document.getElementById('expForm');
    const listaExperimentos = document.getElementById('listaExperimentos');
    const buscaInput = document.getElementById('busca');
    const resultsSection = document.getElementById('resultsSection');
    const tituloCategoria = document.getElementById('tituloCategoria');
    
    // Elementos do Modal
    const modalOverlay = document.getElementById('modalOverlay');
    const btnOpenModal = document.getElementById('btnOpenModal');
    const btnCloseModal = document.getElementById('btnCloseModal');

    // Banco de dados local (guarda tudo no navegador do PC/Celular)
    let experimentos = JSON.parse(localStorage.getItem('experimentosLab')) || [];
    let areaAtual = 'Todos';

    // 1. ATUALIZAR CONTADORES DOS QUADRADINHOS
    function atualizarContadores() {
        const areas = ['Mecânica', 'Óptica', 'Termodinâmica', 'Eletromagnetismo', 'Ondulatória', 'Outros'];
        
        areas.forEach(area => {
            const total = experimentos.filter(exp => exp.area === area).length;
            let idSpan = '';
            
            if (area === 'Mecânica') idSpan = 'count-mecanica';
            else if (area === 'Óptica') idSpan = 'count-optica';
            else if (area === 'Termodinâmica') idSpan = 'count-termo';
            else if (area === 'Eletromagnetismo') idSpan = 'count-eletro';
            else if (area === 'Ondulatória') idSpan = 'count-ondulatoria';
            else if (area === 'Outros') idSpan = 'count-outros';

            document.getElementById(idSpan).innerText = `${total} itens`;
        });
    }

    // 2. RENDERIZAR TABELA
    function renderizarTabela(dadosParaExibir = experimentos) {
        listaExperimentos.innerHTML = '';

        if (dadosParaExibir.length === 0) {
            listaExperimentos.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #a0aec0;">Nenhum experimento encontrado.</td></tr>`;
            return;
        }

        dadosParaExibir.forEach((exp, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; color: #2d3748;">${exp.nome}</td>
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

    // 3. FILTRAR POR ÁREA (Ao clicar nos quadradinhos)
    window.filtrarPorArea = function(area) {
        areaAtual = area;
        tituloCategoria.innerText = `Experimentos de ${area}`;
        
        const filtrados = experimentos.filter(exp => exp.area === area);
        renderizarTabela(filtrados);
        
        resultsSection.style.display = 'block'; 
        resultsSection.scrollIntoView({ behavior: 'smooth' }); 
    };

    // Fechar aba de resultados
    window.fecharAba = function() {
        resultsSection.style.display = 'none';
        areaAtual = 'Todos';
    };

    // 4. CONTROLES DO MODAL (POP-UP)
    btnOpenModal.addEventListener('click', () => { 
        document.getElementById('area').value = ""; // Reseta a seleção
        modalOverlay.style.display = 'flex'; 
    });
    btnCloseModal.addEventListener('click', () => { modalOverlay.style.display = 'none'; });
    
    // Fechar ao clicar fora do modal
    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.style.display = 'none';
    });

    // FUNÇÃO ATUALIZADA: Abrir o modal já focando na área que o usuário escolheu no card!
    window.abrirModalComArea = function(event, area) {
        event.stopPropagation(); // Evita que abra a aba de baixo ao clicar no botão de mais
        const selectArea = document.getElementById('area');
        selectArea.value = area;
        modalOverlay.style.display = 'flex';
    };

    // 5. CADASTRAR NOVO EXPERIMENTO
    expForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const novoExp = {
            nome: document.getElementById('nome').value,
            area: document.getElementById('area').value,
            localizacao: document.getElementById('localizacao').value,
            componentes: document.getElementById('componentes').value
        };

        experimentos.push(novoExp);
        localStorage.setItem('experimentosLab', JSON.stringify(experimentos));
        
        expForm.reset();
        modalOverlay.style.display = 'none';
        
        atualizarContadores();
        
        if (areaAtual === novoExp.area) {
            filtrarPorArea(areaAtual);
        }
    });

    // 6. BUSCA GLOBAL
    buscaInput.addEventListener('input', (e) => {
        const termoBusca = e.target.value.toLowerCase();
        
        if (termoBusca === '') {
            resultsSection.style.display = 'none';
            return;
        }

        const filtrados = experimentos.filter(exp => {
            return (
                exp.nome.toLowerCase().includes(termoBusca) ||
                exp.area.toLowerCase().includes(termoBusca) ||
                exp.componentes.toLowerCase().includes(termoBusca)
            );
        });

        tituloCategoria.innerText = `Resultados para "${termoBusca}"`;
        renderizarTabela(filtrados);
        resultsSection.style.display = 'block';
    });

    // 7. DELETAR
    window.deletarExperimento = function(index) {
        if (confirm(`Tem certeza que deseja excluir o experimento "${experimentos[index].nome}"?`)) {
            const areaDoExcluido = experimentos[index].area;
            experimentos.splice(index, 1);
            localStorage.setItem('experimentosLab', JSON.stringify(experimentos));
            
            atualizarContadores();
            
            if (areaAtual === areaDoExcluido) {
                filtrarPorArea(areaAtual);
            } else {
                fecharAba();
            }
        }
    };

    atualizarContadores();
});

