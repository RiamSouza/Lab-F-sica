// --- LISTAS INICIAIS MUTÁVEIS (CARREGADAS DO LOCALSTORAGE OU PADRÃO) ---
const listaPadraoExperimentos = [
    {"id": 1, "nome":"Conjunto para determinação e medição com precisão, com luz laser e espelho de alto giro, prancha óptica de 1m de comprimento com trilho central","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 2, "nome":"Conjunto para queda de corpos, com multicronômetro, rolagem e sensor","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 3, "nome":"Pista tautócrona com sensor e cronômetro","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 4, "nome":"Mesa de ar e carro com retropropulsão","area":"Mecânica","localizacao":"Mesa ","componentes":"Com sensor e sem sensor "},
    {"id": 5, "nome":"Giroscópio de três eixos","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 6, "nome":"Conjunto de engrenagens em polia","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 7, "nome":"Conjunto para estudo de poço de potencial - conservação da energia mecânica","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 8, "nome":"Balança de torção com laser","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 9, "nome":"Trilho de ar, multicronômetro, rolagem, 5 sensores e unidade de fluxo","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 10, "nome":"Plano inclinado com sensores e multicronômetro de rolagem de dados","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 11, "nome":"Plano inclinado articulável com base de aço, modular e desmontável","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 12, "nome":"Disparador de projétil Aspach","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 13, "nome":"Dinamômetro tubular com capacidade de 1N","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 14, "nome":"Dinamômetro tubular com capacidade de 2N","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 15, "nome":"Dinamômetro tubular com capacidade de 10N","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 16, "nome":"Looping com sensor e multicronômetro","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 17, "nome":"Looping","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 18, "nome":"Painel de mecânica (estática)","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 19, "nome":"Painel de forças metálico","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 20, "nome":"Aparelho rotacional, multicronômetro, rolagem e 2 sensores","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 21, "nome":"Conjunto de massas, molas e MHS com multicronômetro","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 22, "nome":"Conjunto de mecânica dos sólidos com rampa","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 23, "nome":"Anel de Gravesande com cabos, anel e esferas","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 24, "nome":"Conjunto para estudo de ondas estacionárias","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 25, "nome":"Conjunto para ondas mecânicas","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 26, "nome":"Heliodon com iluminador","area":"Óptica","localizacao":"","componentes":""},
    {"id": 27, "nome":"Binóculo astronômico 10x (ampliação) 50mm (diâmetro da lente) Lugan ou similar","area":"Óptica","localizacao":"","componentes":""},
    {"id": 28, "nome":"Conjunto de óptica","area":"Óptica","localizacao":"","componentes":""},
    {"id": 29, "nome":"Espelho de parede para banheiro, 4mm, 600x600mm, com moldura de alumínio ou madeira nas bordas","area":"Óptica","localizacao":"","componentes":""},
    {"id": 30, "nome":"Equipamento para determinação do equivalente mecânico do calor","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 31, "nome":"Conjunto de dilatação","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 32, "nome":"Conjunto de termodinâmica","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 33, "nome":"Calorímetro com resistor","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 34, "nome":"Calorímetro","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 35, "nome":"Cubo de radiação térmica","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 36, "nome":"Aparelho gaseológico para estudo da Lei de Boyle-Mariotte","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 37, "nome":"Picnômetro com termômetro","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 38, "nome":"Laboratório didático de eletricidade","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 39, "nome":"Conjunto de magnetismo e eletromagnetismo","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 40, "nome":"Conjunto para magnetostática e eletromagnetismo","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 41, "nome":"Conjunto para Lei de Lenz-Faraday e corrente de Foucault","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 42, "nome":"Gerador eletrostático","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 43, "nome":"Gerador eletrostático de Van der Graaf","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 44, "nome":"Sistema completo para determinação da relação carga/massa do elétron","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 45, "nome":"Empuxômetro","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 46, "nome":"Lei de Hooke","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 47, "nome":"Kit de Forças","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 48, "nome":"Painel Hidrostático","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 49, "nome":"Conjunto para Estudo da Inércia","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 50, "nome":"Conjunto de Lançamentos Horizontais","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 51, "nome":"Conjunto de Luz","area":"Óptica","localizacao":"","componentes":""},
    {"id": 52, "nome":"Painel Elementos de Máquinas e Mecanismos, Engrenagens, Polias e Barra Dentada","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 53, "nome":"Conjunto para Radiação Térmica, Digital com Discos","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 54, "nome":"Conjunto Demonstrativo para Meios de Propagação do Calor","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 55, "nome":"Banco Óptico","area":"Óptica","localizacao":"","componentes":""},
    {"id": 56, "nome":"Propagação de Calor","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 57, "nome":"Conjunto Mecânica","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 58, "nome":"Onda Longitudinal Estacionária em Uma Mola","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 59, "nome":"Calorímetro Didático","area":"Termodinâmica","localizacao":"","componentes":""},
    {"id": 60, "nome":"Superfícies Equipotenciais","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 61, "nome":"Pendulo Simples","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 62, "nome":"Painel de Associação de Resistores","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 63, "nome":"Aparelho Rotativo","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 64, "nome":"Cuba de Ondas Eletrônica","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 65, "nome":"Transformador Didático Desmontável","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 66, "nome":"Balanço Magnético","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 67, "nome":"Trilho de Ar","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 68, "nome":"Conjunto para Lei de Hooke e Princípio de Arquimedes","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 69, "nome":"Cuba de Ondas com Estroboflash","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 70, "nome":"Experimento de Magdeburgo","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 71, "nome":"Demonstrador da Propagação da Pressão","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 72, "nome":"Tubo em U","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 73, "nome":"Vasos Comunicantes","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 74, "nome":"Capacitador de Placas Paralelas","area":"Eletromagnetismo","localizacao":"","componentes":""},
    {"id": 75, "nome":"Lançador de Projéteis com Pêndulo Balístico","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 76, "nome":"Conjunto de Lâminas Ressonantes","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 77, "nome":"Viscosímetro de Stokes com Cronômetro e Sensores","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 78, "nome":"Conjunto para Funções, Gráficos, Erros e Medidas","area":"Outros","localizacao":"","componentes":""},
    {"id": 79, "nome":"Disco de Newton","area":"Óptica","localizacao":"","componentes":""},
    {"id": 80, "nome":"Conjunto de Molas, Lei de Hooke e MHS","area":"Mecânica","localizacao":"","componentes":""},
    {"id": 81, "nome":"Conjunto de Diapasões","area":"Ondulatória","localizacao":"","componentes":""},
    {"id": 82, "nome":"Conjunto de Dinâmica de Rotações","area":"Mecânica","localizacao":"","componentes":""}
];

// Tenta buscar do localStorage; caso não encontre, inicia com a lista padrão
let experimentos = JSON.parse(localStorage.getItem('experimentosLab')) || listaPadraoExperimentos;

// Normalização preventiva dos IDs e chaves estruturais
experimentos = experimentos.map((exp, index) => {
    if (!exp.id) exp.id = index + 1;
    return exp;
});

let avisos = [
    {"id": 1, "autor": "Prof. Carlos", "texto": "O kit de \"Mesa de Ar\" foi movido para o Armário B provisoriamente.", "data": "02/07/2026"},
    {"id": 2, "autor": "Monitoria", "texto": "Plantão de dúvidas de Ondulatória e Óptica nesta sexta-feira às 14h.", "data": "01/07/2026"}
];

let usuarioLogado = false; 

// --- MAPEAMENTO DE ELEMENTOS ---
const welcomeScreen = document.getElementById('welcomeScreen');
const authScreen = document.getElementById('authScreen');
const mainApp = document.getElementById('mainApp');
const adminPanel = document.getElementById('adminPanel');
const userStatus = document.getElementById('userStatus');
const grid = document.getElementById('experimentsGrid');
const noticeList = document.getElementById('noticeList');
const searchBar = document.getElementById('searchBar');

const CHAVE_MESTRE_LAB = "IFSP123"; 

// --- CONTROLE DE NAVEGAÇÃO ---
function entrarComoAluno() {
    usuarioLogado = false;
    welcomeScreen.style.display = 'none';
    mainApp.style.display = 'block';
    adminPanel.style.display = 'none';
    userStatus.innerHTML = "Modo: Leitura (Estudante)";
    exibirExperimentos(experimentos);
    exibirAvisos();
}

function mostrarTelaAuth() {
    welcomeScreen.style.display = 'none';
    authScreen.style.display = 'block';
}

function voltarParaInicio() {
    authScreen.style.display = 'none';
    mainApp.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    document.getElementById('formLogin').reset();
    document.getElementById('formCadastro').reset();
}

function alternarTab(tipo) {
    const tabLogin = document.getElementById('tabLogin');
    const tabCadastro = document.getElementById('tabCadastro');
    const formLogin = document.getElementById('formLogin');
    const formCadastro = document.getElementById('formCadastro');

    if(tipo === 'login') {
        tabLogin.classList.add('active');
        tabCadastro.classList.remove('active');
        formLogin.style.display = 'block';
        formCadastro.style.display = 'none';
    } else {
        tabCadastro.classList.add('active');
        tabLogin.classList.remove('active');
        formCadastro.style.display = 'block';
        formLogin.style.display = 'none';
    }
}

// --- FLUXOS DE AUTENTICAÇÃO ---
function executarCadastro(event) {
    event.preventDefault();
    const nome = document.getElementById('cadNome').value;
    const senha = document.getElementById('cadPassword').value;
    const senhaConf = document.getElementById('cadPasswordConfirm').value;
    const chave = document.getElementById('cadChave').value;

    if (senha !== senhaConf) { alert("As senhas não coincidem!"); return; }
    if (chave !== CHAVE_MESTRE_LAB) { alert("Chave incorreta!"); return; }

    const numeroAleatorio = Math.floor(1000000 + Math.random() * 9000000);
    const novoID = "LF" + numeroAleatorio;

    alert(`Cadastrado com sucesso!\n\nSEU ID DE ACESSO: ${novoID}`);
    document.getElementById('loginId').value = novoID;
    alternarTab('login');
}

function executarLogin(event) {
    event.preventDefault();
    // Captura o ID, remove espaços extras nas pontas e força letras maiúsculas
    const id = document.getElementById('loginId').value.trim().toUpperCase();
    
    if(id.startsWith("LF") && id.length === 9) {
        usuarioLogado = true;
        authScreen.style.display = 'none';
        welcomeScreen.style.display = 'none';
        mainApp.style.display = 'block';
        adminPanel.style.display = 'block'; 
        userStatus.innerHTML = `Modo Administrativo (${id})`;
        exibirExperimentos(experimentos);
        exibirAvisos();
    } else {
        alert("Erro: O ID deve seguir o padrão LF0000000 (Letras LF + 7 números). Verifique se não digitou espaços!");
    }
}

// --- RENDERS (EXIBIÇÃO COM CORES DINÂMICAS) ---
function exibirExperimentos(lista) {
    grid.innerHTML = '';
    if(lista.length === 0) {
        grid.innerHTML = '<div class="no-results">Nenhum experimento encontrado.</div>';
        return;
    }

    lista.forEach(exp => {
        const card = document.createElement('div');
        
        let classeArea = (exp.area || 'outros').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        card.className = `card card-${classeArea}`;
        
        // Se estiver logado, cria os ícones de Lápis (Editar) e Lixeira (Excluir) no canto superior direito
        let acoesAdmin = usuarioLogado ? `
            <div class="card-header-actions">
                <button class="btn-icon" onclick="editarExperimento(${exp.id})" title="Editar Experimento">✏️</button>
                <button class="btn-icon" onclick="removerExperimento(${exp.id})" title="Remover Experimento">🗑️</button>
            </div>
        ` : '';

        card.innerHTML = `
            <div>
                ${acoesAdmin}
                <span class="badge badge-${classeArea}">${exp.area || 'Não Definida'}</span>
                <h3 style="margin: 5px 0 15px 0; color: var(--primary-color); font-size:16px;">${exp.nome}</h3>
                <p class="info-item"><span class="info-label">Localização:</span> ${exp.localizacao || 'Não cadastrada'}</p>
                <p class="info-item"><span class="info-label">Componentes:</span> ${exp.componentes || 'Não catalogados'}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function exibirAvisos() {
    noticeList.innerHTML = '';
    if (avisos.length === 0) {
        noticeList.innerHTML = '<div style="color:#856404; font-size:14px;">Nenhum aviso no mural.</div>';
        return;
    }

    avisos.forEach(av => {
        const item = document.createElement('div');
        item.className = 'notice-item';
        
        let botaoDeletarAviso = usuarioLogado ? `<button class="btn-delete" style="margin:0;" onclick="removerAviso(${av.id})">Deletar</button>` : '';

        item.innerHTML = `
            <div><strong>[${av.data}] ${av.autor}:</strong> ${av.texto}</div>
            ${botaoDeletarAviso}
        `;
        noticeList.appendChild(item);
    });
}

// --- OPERAÇÕES ADMINISTRATIVAS ---
function adicionarExperimentoNoGrid(event) {
    event.preventDefault();
    const nome = document.getElementById('expNome').value;
    const area = document.getElementById('expArea').value;
    const localizacao = document.getElementById('expLocal').value;
    const componentes = document.getElementById('expComp').value;

    const novoExp = {
        id: Date.now(),
        nome, area, localizacao, componentes
    };

    experimentos.push(novoExp);
    localStorage.setItem('experimentosLab', JSON.stringify(experimentos)); // Mantém persistido no navegador
    exibirExperimentos(experimentos);
    document.getElementById('formNovoExperimento').reset();
}

function editarExperimento(id) {
    const exp = experimentos.find(e => e.id === id);
    if (!exp) return;

    const novoNome = prompt("Editar Nome do Experimento:", exp.nome);
    if (novoNome === null) return; // Cancelado

    const novaArea = prompt("Editar Área (Mecânica, Óptica, Ondulatória, Termodinâmica, Eletromagnetismo, Outros):", exp.area);
    if (novaArea === null) return;

    const novaLocalizacao = prompt("Editar Localização:", exp.localizacao);
    if (novaLocalizacao === null) return;

    const novosComponentes = prompt("Editar Componentes:", exp.componentes);
    if (novosComponentes === null) return;

    exp.nome = novoNome.trim() !== "" ? novoNome : exp.nome;
    exp.area = novaArea.trim() !== "" ? novaArea : exp.area;
    exp.localizacao = novaLocalizacao;
    exp.componentes = novosComponentes;

    localStorage.setItem('experimentosLab', JSON.stringify(experimentos));
    exibirExperimentos(experimentos);
    alert("Experimento atualizado com sucesso!");
}

function removerExperimento(id) {
    if(confirm("Tem certeza que deseja remover este experimento do inventário?")) {
        experimentos = experimentos.filter(exp => exp.id !== id);
        localStorage.setItem('experimentosLab', JSON.stringify(experimentos)); // Atualiza o localStorage
        exibirExperimentos(experimentos);
    }
}

function adicionarAvisoNoMural(event) {
    event.preventDefault();
    const autor = document.getElementById('avisoAutor').value;
    const texto = document.getElementById('avisoTexto').value;
    
    const hoje = new Date();
    const dataFormatada = `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}`;

    const novoAviso = {
        id: Date.now(),
        autor, texto, data: dataFormatada
    };

    avisos.unshift(novoAviso);
    exibirAvisos();
    document.getElementById('formNovoAviso').reset();
}

function removerAviso(id) {
    if(confirm("Deseja apagar esse aviso do mural?")) {
        avisos = avisos.filter(av => av.id !== id);
        exibirAvisos();
    }
}

// --- BARRA DE BUSCA ---
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const termoBusca = e.target.value.toLowerCase();
        const filtrados = experimentos.filter(exp => {
            return exp.nome.toLowerCase().includes(termoBusca) || exp.area.toLowerCase().includes(termoBusca);
        });
        exibirExperimentos(filtrados);
    });
}

// --- ASSOCIAÇÃO DAS FUNÇÕES AO ESCOPO GLOBAL (WINDOW) ---
window.entrarComoAluno = entrarComoAluno;
window.mostrarTelaAuth = mostrarTelaAuth;
window.voltarParaInicio = voltarParaInicio;
window.alternarTab = alternarTab;
window.executarCadastro = executarCadastro;
window.executarLogin = executarLogin;
window.adicionarExperimentoNoGrid = adicionarExperimentoNoGrid;
window.removerExperimento = removerExperimento;
window.adicionarAvisoNoMural = adicionarAvisoNoMural;
window.removerAviso = removerAviso;
window.editarExperimento = editarExperimento;