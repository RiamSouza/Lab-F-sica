
// =======================================================
// CONFIGURAÇÃO: cole aqui a URL do seu Apps Script publicado
// (Implantar -> Nova implantação -> App da Web -> copiar URL)
// =======================================================
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwwbfPMl_PJGJTDS34JYKA2NHTKEfxoUWC55YoqT0176TAP6z5gYEjDDoQthu9ZGkQtew/exec";
 
let experimentos = [];
let avisos = [];
let relatos = [];
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
 
// --- COMUNICAÇÃO COM A PLANILHA ---
// Faz a requisição e tenta de novo automaticamente se o Google devolver
// uma resposta instável (página HTML de erro em vez de JSON).
async function requisitarComRetry(fazerRequisicao, tentativas = 3) {
    for (let i = 0; i < tentativas; i++) {
        try {
            const resp = await fazerRequisicao();
            const texto = await resp.text();
            const json = JSON.parse(texto); // se vier HTML, cai no catch abaixo
            if (json.erro) throw new Error(json.erro);
            return json;
        } catch (err) {
            const ultimaTentativa = i === tentativas - 1;
            if (ultimaTentativa) throw err;
            await new Promise(r => setTimeout(r, 800 * (i + 1))); // espera um pouco antes de tentar de novo
        }
    }
}

async function buscarDaPlanilha(tipo) {
    return requisitarComRetry(() => fetch(`${URL_SCRIPT}?tipo=${tipo}`));
}

// Content-Type text/plain evita que o navegador dispare um "preflight" (OPTIONS),
// que o Apps Script não responde corretamente.
async function enviarParaPlanilha(tipo, acao, dados) {
    return requisitarComRetry(() => fetch(URL_SCRIPT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ tipo, acao, dados })
    }));
}
 
async function carregarDados() {
    try {
        grid.innerHTML = '<div class="no-results">Carregando experimentos...</div>';
        noticeList.innerHTML = '<div style="font-size:14px;">Carregando avisos...</div>';
 
        const [expData, avisosData, relatosData] = await Promise.all([
            buscarDaPlanilha('Experimentos'),
            buscarDaPlanilha('Avisos'),
            buscarDaPlanilha('Relatos')
        ]);
 
        experimentos = expData;
        avisos = avisosData;
        relatos = relatosData;
 
        exibirExperimentos(experimentos);
        exibirAvisos();
        if (usuarioLogado) exibirRelatosPendentes();
    } catch (err) {
        grid.innerHTML = `<div class="no-results">Erro ao carregar dados: ${err.message}</div>`;
        console.error(err);
    }
}
 
// --- CONTROLE DE NAVEGAÇÃO ---
function entrarComoAluno() {
    usuarioLogado = false;
    welcomeScreen.style.display = 'none';
    mainApp.style.display = 'block';
    adminPanel.style.display = 'none';
    userStatus.innerHTML = "Modo: Leitura (Estudante)";
    carregarDados();
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
 
    if (tipo === 'login') {
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
    const id = document.getElementById('loginId').value.trim().toUpperCase();
 
    if (id.startsWith("LF") && id.length === 9) {
        usuarioLogado = true;
        authScreen.style.display = 'none';
        welcomeScreen.style.display = 'none';
        mainApp.style.display = 'block';
        adminPanel.style.display = 'block';
        userStatus.innerHTML = `Modo Administrativo (${id})`;
        carregarDados();
    } else {
        alert("Erro: O ID deve seguir o padrão LF0000000 (Letras LF + 7 números). Verifique se não digitou espaços!");
    }
}
 
// --- RENDERS ---
function exibirExperimentos(lista) {
    grid.innerHTML = '';
    if (lista.length === 0) {
        grid.innerHTML = '<div class="no-results">Nenhum experimento encontrado.</div>';
        return;
    }
 
    lista.forEach(exp => {
        const card = document.createElement('div');
 
        let classeArea = (exp.area || 'outros').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
        card.className = `card card-${classeArea} card-clicavel`;
        card.onclick = () => abrirModalExperimento(exp.linha);
 
        let acoesAdmin = usuarioLogado ? `
            <div class="card-header-actions">
                <button class="btn-icon" onclick="event.stopPropagation(); editarExperimento(${exp.linha})" title="Editar Experimento">✏️</button>
                <button class="btn-icon" onclick="event.stopPropagation(); removerExperimento(${exp.linha})" title="Remover Experimento">🗑️</button>
            </div>
        ` : '';
 
        let seloStatus = '';
        if (exp.status === 'Em Reparo') seloStatus = `<span class="status-badge status-reparo">🛠️ Em Reparo</span>`;
        if (exp.status === 'Com Defeito') seloStatus = `<span class="status-badge status-defeito">⚠️ Com Defeito</span>`;
 
        card.innerHTML = `
            <div>
                ${acoesAdmin}
                <div class="card-top-row">
                    <span class="badge badge-${classeArea}">${exp.area || 'Não Definida'}</span>
                    ${seloStatus}
                </div>
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
 
        let botaoDeletarAviso = usuarioLogado ? `<button class="btn-delete" style="margin:0;" onclick="removerAviso(${av.linha})">Deletar</button>` : '';
 
        item.innerHTML = `
            <div><strong>[${av.data}] ${av.autor}:</strong> ${av.texto}</div>
            ${botaoDeletarAviso}
        `;
        noticeList.appendChild(item);
    });
}
 
// --- OPERAÇÕES ADMINISTRATIVAS (EXPERIMENTOS) ---
async function adicionarExperimentoNoGrid(event) {
    event.preventDefault();
    const nome = document.getElementById('expNome').value;
    const area = document.getElementById('expArea').value;
    const localizacao = document.getElementById('expLocal').value;
    const componentes = document.getElementById('expComp').value;
 
    try {
        await enviarParaPlanilha('Experimentos', 'adicionar', { nome, area, localizacao, componentes });
        document.getElementById('formNovoExperimento').reset();
        await carregarDados();
    } catch (err) {
        alert("Erro ao salvar experimento: " + err.message);
    }
}
 
async function editarExperimento(linha) {
    const exp = experimentos.find(e => e.linha === linha);
    if (!exp) return;
 
    const novoNome = prompt("Editar Nome do Experimento:", exp.nome);
    if (novoNome === null) return;
 
    const novaArea = prompt("Editar Área (Mecânica, Óptica, Ondulatória, Termodinâmica, Eletromagnetismo, Outros):", exp.area);
    if (novaArea === null) return;
 
    const novaLocalizacao = prompt("Editar Localização:", exp.localizacao);
    if (novaLocalizacao === null) return;
 
    const novosComponentes = prompt("Editar Componentes:", exp.componentes);
    if (novosComponentes === null) return;
 
    const dadosAtualizados = {
        linha,
        nome: novoNome.trim() !== "" ? novoNome : exp.nome,
        area: novaArea.trim() !== "" ? novaArea : exp.area,
        localizacao: novaLocalizacao,
        componentes: novosComponentes
    };
 
    try {
        await enviarParaPlanilha('Experimentos', 'editar', dadosAtualizados);
        await carregarDados();
        alert("Experimento atualizado com sucesso!");
    } catch (err) {
        alert("Erro ao editar experimento: " + err.message);
    }
}
 
async function removerExperimento(linha) {
    if (!confirm("Tem certeza que deseja remover este experimento do inventário?")) return;
    try {
        await enviarParaPlanilha('Experimentos', 'remover', { linha });
        await carregarDados();
    } catch (err) {
        alert("Erro ao remover experimento: " + err.message);
    }
}
 
// --- OPERAÇÕES ADMINISTRATIVAS (AVISOS) ---
async function adicionarAvisoNoMural(event) {
    event.preventDefault();
    const autor = document.getElementById('avisoAutor').value;
    const texto = document.getElementById('avisoTexto').value;
 
    const hoje = new Date();
    const dataFormatada = `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}`;
 
    try {
        await enviarParaPlanilha('Avisos', 'adicionar', { autor, texto, data: dataFormatada });
        document.getElementById('formNovoAviso').reset();
        await carregarDados();
    } catch (err) {
        alert("Erro ao publicar aviso: " + err.message);
    }
}
 
async function removerAviso(linha) {
    if (!confirm("Deseja apagar esse aviso do mural?")) return;
    try {
        await enviarParaPlanilha('Avisos', 'remover', { linha });
        await carregarDados();
    } catch (err) {
        alert("Erro ao remover aviso: " + err.message);
    }
}
 
// --- MODAL DE DETALHES DO EXPERIMENTO ---
function abrirModalExperimento(linha) {
    const exp = experimentos.find(e => e.linha === linha);
    if (!exp) return;
 
    const modalOverlay = document.getElementById('modalOverlay');
    const modalConteudo = document.getElementById('modalConteudo');
 
    const statusAtual = exp.status || 'Ativo';
 
    let blocoAcao = '';
    if (usuarioLogado) {
        blocoAcao = `
            <div class="form-group" style="margin-top:16px;">
                <label for="modalStatusSelect">Status do experimento</label>
                <select id="modalStatusSelect">
                    <option value="Ativo" ${statusAtual === 'Ativo' ? 'selected' : ''}>Ativo</option>
                    <option value="Em Reparo" ${statusAtual === 'Em Reparo' ? 'selected' : ''}>Em Reparo</option>
                    <option value="Com Defeito" ${statusAtual === 'Com Defeito' ? 'selected' : ''}>Com Defeito</option>
                </select>
                <button class="btn-admin-action" style="margin-top:8px;" onclick="mudarStatusExperimento(${linha})">Salvar status</button>
            </div>
            <div style="margin-top:16px;">
                <h4 style="margin-bottom:8px; font-size:14px;">Relatos deste experimento</h4>
                <div id="modalRelatosDoItem"></div>
            </div>
        `;
    } else {
        blocoAcao = `
            <div class="form-group" style="margin-top:16px;">
                <label for="modalRelatoTexto">Reportar problema com este experimento</label>
                <textarea id="modalRelatoTexto" rows="3" placeholder="Descreva o que você percebeu..."></textarea>
                <button class="btn-admin-action" style="margin-top:8px;" onclick="reportarProblema(${linha})">Enviar relato</button>
            </div>
        `;
    }
 
    modalConteudo.innerHTML = `
        <button class="modal-fechar" onclick="fecharModal()">✕</button>
        <h3>${exp.nome}</h3>
        <p class="info-item"><span class="info-label">Área:</span> ${exp.area || 'Não definida'}</p>
        <p class="info-item"><span class="info-label">Localização:</span> ${exp.localizacao || 'Não cadastrada'}</p>
        <p class="info-item"><span class="info-label">Componentes:</span> ${exp.componentes || 'Não catalogados'}</p>
        <p class="info-item"><span class="info-label">Status atual:</span> ${statusAtual}</p>
        ${blocoAcao}
    `;
 
    modalOverlay.style.display = 'flex';
 
    if (usuarioLogado) {
        const relatosDoItem = relatos.filter(r => String(r.experimento_linha) === String(linha));
        const container = document.getElementById('modalRelatosDoItem');
        if (relatosDoItem.length === 0) {
            container.innerHTML = `<p style="font-size:13px; color:#7f8c8d;">Nenhum relato pendente.</p>`;
        } else {
            container.innerHTML = relatosDoItem.map(r => `
                <div class="modal-relato-item">
                    <div>${r.descricao}</div>
                    <div style="color:#7f8c8d; font-size:11px;">${r.data}</div>
                    <div class="modal-relato-acoes">
                        <button class="btn-admin-action" onclick="confirmarRelato(${r.linha}, ${linha})">Confirmar defeito</button>
                        <button class="btn-icon" onclick="descartarRelato(${r.linha})">Descartar</button>
                    </div>
                </div>
            `).join('');
        }
    }
}
 
function fecharModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}
 
function fecharModalSeClicouFora(event) {
    if (event.target.id === 'modalOverlay') fecharModal();
}
 
async function mudarStatusExperimento(linha) {
    const novoStatus = document.getElementById('modalStatusSelect').value;
    try {
        await enviarParaPlanilha('Experimentos', 'mudarStatus', { linha, status: novoStatus });
        await carregarDados();
        fecharModal();
    } catch (err) {
        alert("Erro ao mudar status: " + err.message);
    }
}
 
async function reportarProblema(linha) {
    const descricao = document.getElementById('modalRelatoTexto').value.trim();
    if (!descricao) { alert("Descreva o problema antes de enviar."); return; }
 
    const hoje = new Date();
    const dataFormatada = `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}`;
 
    try {
        await enviarParaPlanilha('Relatos', 'adicionar', { experimento_linha: linha, descricao, data: dataFormatada });
        alert("Obrigado! O relato foi enviado e será verificado pelo responsável do laboratório.");
        fecharModal();
    } catch (err) {
        alert("Erro ao enviar relato: " + err.message);
    }
}
 
// --- PAINEL ADMIN: RELATOS PENDENTES ---
function exibirRelatosPendentes() {
    const lista = document.getElementById('relatosPendentesList');
    const contador = document.getElementById('contadorRelatos');
    if (!lista || !contador) return;
 
    contador.textContent = relatos.length;
 
    if (relatos.length === 0) {
        lista.innerHTML = `<p style="font-size:13px; color:#7f8c8d;">Nenhum relato pendente.</p>`;
        return;
    }
 
    lista.innerHTML = relatos.map(r => {
        const exp = experimentos.find(e => String(e.linha) === String(r.experimento_linha));
        const nomeExp = exp ? exp.nome : `Experimento (linha ${r.experimento_linha})`;
        return `
            <div class="modal-relato-item">
                <strong>${nomeExp}</strong>
                <div>${r.descricao}</div>
                <div style="color:#7f8c8d; font-size:11px;">${r.data}</div>
                <div class="modal-relato-acoes">
                    <button class="btn-admin-action" onclick="confirmarRelato(${r.linha}, ${r.experimento_linha})">Confirmar defeito</button>
                    <button class="btn-icon" onclick="descartarRelato(${r.linha})">Descartar</button>
                </div>
            </div>
        `;
    }).join('');
}
 
async function confirmarRelato(linhaRelato, experimentoLinha) {
    try {
        await enviarParaPlanilha('Experimentos', 'mudarStatus', { linha: experimentoLinha, status: 'Com Defeito' });
        await enviarParaPlanilha('Relatos', 'remover', { linha: linhaRelato });
        await carregarDados();
        fecharModal();
    } catch (err) {
        alert("Erro ao confirmar relato: " + err.message);
    }
}
 
async function descartarRelato(linhaRelato) {
    if (!confirm("Descartar esse relato sem alterar o status do experimento?")) return;
    try {
        await enviarParaPlanilha('Relatos', 'remover', { linha: linhaRelato });
        await carregarDados();
    } catch (err) {
        alert("Erro ao descartar relato: " + err.message);
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
window.abrirModalExperimento = abrirModalExperimento;
window.fecharModal = fecharModal;
window.fecharModalSeClicouFora = fecharModalSeClicouFora;
window.mudarStatusExperimento = mudarStatusExperimento;
window.reportarProblema = reportarProblema;
window.confirmarRelato = confirmarRelato;
window.descartarRelato = descartarRelato;
 






