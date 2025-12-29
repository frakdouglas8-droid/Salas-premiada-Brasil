// salas.js

const salasInfo = [
    {valor: 2, participantes: []},
    {valor: 5, participantes: []},
    {valor: 10, participantes: []},
    {valor: 20, participantes: []},
    {valor: 30, participantes: []},
    {valor: 40, participantes: []},
    {valor: 50, participantes: []},
    {valor: 100, participantes: []}
];

// Função para carregar salas públicas
function carregarSalas() {
    const container = document.getElementById('salasContainer');
    container.innerHTML = '';
    salasInfo.forEach((sala, index) => {
        const div = document.createElement('div');
        div.className = 'sala';
        div.innerHTML = `
            <h3>R$ ${sala.valor}</h3>
            <p>${sala.participantes.length} / 20 participantes</p>
            <button onclick="entrarSala(${index})">Participar</button>
        `;
        container.appendChild(div);
    });
}

// Função para entrar na sala
function entrarSala(index) {
    const logado = JSON.parse(localStorage.getItem('logado'));
    if(!logado) { alert("Faça login!"); return; }

    const sala = salasInfo[index];
    if(sala.participantes.includes(logado.email)) { alert("Você já está nesta sala!"); return; }
    if(sala.participantes.length >= 20) { alert("Sala cheia!"); return; }

    sala.participantes.push(logado.email);
    alert("Entrada realizada na sala R$" + sala.valor);

    // Checar se completou 20 participantes e sortear
    if(sala.participantes.length === 20){
        sorteio(sala);
    }

    carregarSalas();
}

// Sorteio automático
function sorteio(sala){
    const vencedorIndex = Math.floor(Math.random() * 20);
    const vencedorEmail = sala.participantes[vencedorIndex];
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || "[]");
    let vencedor = usuarios.find(u => u.email === vencedorEmail);
    const premio = sala.valor * 20 * 0.85; // 85% para o vencedor
    vencedor.saldo += premio;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert(`Sorteio da sala R$${sala.valor} concluído! Vencedor: ${vencedor.nome}, prêmio: R$${premio.toFixed(2)}`);
}
