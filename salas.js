// Proteção: só entra logado
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if(!usuario){
  alert("Faça login!");
  window.location.href = "login.html";
}

// Configuração das salas
const valores = [2,5,10,20,30,40,50,100];
let salas = JSON.parse(localStorage.getItem("salas")) || [];

if(salas.length === 0){
  salas = valores.map(v => ({
    valor: v,
    participantes: []
  }));
  localStorage.setItem("salas", JSON.stringify(salas));
}

const container = document.getElementById("salasContainer");

// Renderizar salas
function renderSalas(){
  container.innerHTML = "";

  salas.forEach((sala, index) => {
    const div = document.createElement("div");
    div.className = "sala";

    div.innerHTML = `
      <h3>R$ ${sala.valor}</h3>
      <p>${sala.participantes.length} / 20</p>
      <button onclick="entrarSala(${index})">Entrar</button>
    `;

    container.appendChild(div);
  });
}

function entrarSala(index){
  const sala = salas[index];

  if(sala.participantes.includes(usuario.email)){
    alert("Você já entrou nessa sala!");
    return;
  }

  if(sala.participantes.length >= 20){
    alert("Sala cheia!");
    return;
  }

  sala.participantes.push(usuario.email);
  localStorage.setItem("salas", JSON.stringify(salas));

  if(sala.participantes.length === 20){
    alert("Sala lotada! Sorteio automático na próxima fase 🔥");
  }

  renderSalas();
}

renderSalas();
