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
    const modalTitle = document.getElementById('modalTitle');
    const btnSubmitForm = document.getElementById('btnSubmitForm');
    const editIndexField = document.getElementById('editIndex');

    // Senha padrão definida por você
    const SENHA_MESTRE = "2026";

    // Banco de dados local
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

    // 2. RENDERIZAR TABELA COM BOTÃO DE EDITAR E EXCLUIR
    function renderizarTabela(dadosParaExibir = experimentos) {
        listaExperimentos.innerHTML = '';

        if (dadosParaExibir.length === 0) {
            listaExperimentos.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #a0aec0;">Nenhum experimento encontrado.</td></tr>`;
            return;
        }

        dadosParaExibir.forEach((exp) => {
            // Buscamos o index real no array principal para não dar erro ao filtrar
            const indexReal = experimentos.findIndex(e => e.nome === exp.nome && e.localizacao === exp.localizacao);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; color: #2d3748;">${exp.nome}</td>
                <td>${exp.localizacao || 'Não informada'}</td>
                <td style="font-size: 0.9rem; color: #4a5568;">${exp.componentes || 'Nenhum item listado'}</td>
                <td>
                    <div style="display: flex; gap: 5px;">
                        <button class="btn-close" style="background-color: #3182ce; color: white;" onclick="abrirEdicao(${indexReal})">
                            <i class="fa-solid fa-pen-to-square"></i> Editar
                        </button>
                        <button class="btn-delete" onclick="deletarExperimento(${indexReal})">
                            <i class="fa-solid fa-trash-can"></i> Excluir
                        </button>
                    </div>
                </td>
            `;
            listaExperimentos.appendChild(tr);
        });
    }

    // 3. FILTRAR POR ÁREA
    window.filtrarPorArea = function(area) {
        areaAtual = area;
        tituloCategoria.innerText = `Experimentos de ${area}`;
        
        const filtrados = experimentos.filter(exp => exp.area === area);
        renderizarTabela(filtrados);
        
        resultsSection.style.display = 'block'; 
        resultsSection.scrollIntoView({ behavior: 'smooth' }); 
    };

    window.fecharAba = function() {
        resultsSection.style.display = 'none';
        areaAtual = 'Todos';
    };

    // 4. CONTROLES DO MODAL (POP-UP)
    btnOpenModal.addEventListener('click', () => { 
        abrirModalParaCriar();
    });
    
    btnCloseModal.addEventListener('click', () => { modalOverlay.style.display = 'none'; });
    
    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.style.display = 'none';
    });

    function abrirModalParaCriar() {
        modalTitle.innerHTML = `<i class="fa-solid fa-flask"></i> Novo Experimento`;
        btnSubmitForm.innerText = "Salvar Experimento";
        expForm.reset();
        editIndexField.value = ""; // Limpa a marcação de edição
        modalOverlay.style.display = 'flex';
    }

    window.abrirModalComArea = function(event, area) {
        event.stopPropagation();
        abrirModalParaCriar();
        document.getElementById('area').value = area;
    };

    // FUNÇÃO DE EDITAR: Abre o modal preenchido com a trava de segurança!
    window.abrirEdicao = function(index) {
        const senhaDigitada = prompt(`Para editar o experimento "${experimentos[index].nome}", digite a senha do laboratório:`);

        if (senhaDigitada === null) return;

        if (senhaDigitada === SENHA_MESTRE) {
            const exp = experimentos[index];
            
            // Preenche o formulário com os dados antigos
            document.getElementById('nome').value = exp.nome;
            document.getElementById('area').value = exp.area;
            document.getElementById('localizacao').value = exp.localizacao;
            document.getElementById('componentes').value = exp.componentes;
            
            // Guarda o index para saber qual estamos editando
            editIndexField.value = index;

            // Muda os textos do modal
            modalTitle.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Editar Experimento`;
            btnSubmitForm.innerText = "Atualizar Informações";
            
            modalOverlay.style.display = 'flex';
        } else {
            alert("Senha incorreta! Você não tem autorização para editar.");
        }
    };

    // 5. CADASTRAR OU ATUALIZAR EXPERIMENTO
    expForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const dadosExp = {
            nome: document.getElementById('nome').value,
            area: document.getElementById('area').value,
            localizacao: document.getElementById('localizacao').value,
            componentes: document.getElementById('componentes').value
        };

        const indexParaEditar = editIndexField.value;

        if (indexParaEditar !== "") {
            // Se o campo de index tiver valor, significa que estamos EDITANDO
            experimentos[indexParaEditar] = dadosExp;
            alert("Experimento atualizado com sucesso!");
        } else {
            // Se estiver vazio, estamos CRIANDO um novo
            experimentos.push(dadosExp);
            alert("Experimento cadastrado com sucesso!");
        }

        localStorage.setItem('experimentosLab', JSON.stringify(experimentos));
        
        expForm.reset();
        modalOverlay.style.display = 'none';
        
        atualizarContadores();
        
        // Atualiza a tabela na tela
        if (areaAtual !== 'Todos') {
            filtrarPorArea(areaAtual);
        } else {
            resultsSection.style.display = 'none';
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

    // 7. DELETAR (Também com a trava de segurança "2026")
    window.deletarExperimento = function(index) {
        const senhaDigitada = prompt(`Para excluir o experimento "${experimentos[index].nome}", digite a senha do laboratório:`);

        if (senhaDigitada === null) return;

        if (senhaDigitada === SENHA_MESTRE) {
            const areaDoExcluido = experimentos[index].area;
            experimentos.splice(index, 1);
            localStorage.setItem('experimentosLab', JSON.stringify(experimentos));
            
            atualizarContadores();
            
            if (areaAtual === areaDoExcluido) {
                filtrarPorArea(areaAtual);
            } else {
                fecharAba();
            }
            alert("Experimento excluído com sucesso!");
        } else {
            alert("Senha incorreta! O experimento não foi excluído.");
        }
    };

    atualizarContadores();
});
