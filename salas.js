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

  // 🔥 QUANDO COMPLETAR 20, FAZ SORTEIO
  if(sala.participantes.length === 20){

    const vencedorEmail = sala.participantes[
      Math.floor(Math.random() * sala.participantes.length)
    ];

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    const valorTotal = sala.valor * 20;
    const premio = valorTotal * 0.85; // 85% para o vencedor

    usuarios = usuarios.map(u => {
      if(u.email === vencedorEmail){
        u.saldo += premio;

        alert(
          "🎉 Sorteio realizado!\n\n" +
          "Vencedor: " + u.nome + "\n" +
          "Prêmio: R$ " + premio.toFixed(2)
        );
      }
      return u;
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Atualiza sessão se for o vencedor
    if(usuario.email === vencedorEmail){
      usuario.saldo += premio;
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    }

    // Zera a sala após o sorteio
    sala.participantes = [];
  }

  localStorage.setItem("salas", JSON.stringify(salas));
  renderSalas();
}

renderSalas();
const privContainer = document.getElementById("salasPrivadas");

let salasPrivadas = JSON.parse(localStorage.getItem("salasPrivadas")) || [];

function renderSalasPrivadas(){
  if(!privContainer) return;

  privContainer.innerHTML = "";

  salasPrivadas.forEach((sala, index)=>{
    const div = document.createElement("div");
    div.className = "sala";

    div.innerHTML = `
      <h3>R$ ${sala.valor}</h3>
      <p>${sala.participantes.length} / 20</p>
      <button onclick="entrarPrivada(${index})">Entrar</button>
    `;

    privContainer.appendChild(div);
  });
}

function entrarPrivada(index){
  const codigo = prompt("Digite o código da sala:");
  const sala = salasPrivadas[index];

  if(codigo !== sala.codigo){
    alert("Código inválido");
    return;
  }

  if(sala.participantes.includes(usuario.email)){
    alert("Você já entrou");
    return;
  }

  if(sala.participantes.length >= 20){
    alert("Sala cheia");
    return;
  }

  sala.participantes.push(usuario.email);

  if(sala.participantes.length === 20){
    sortearPrivada(sala);
  }

  localStorage.setItem("salasPrivadas", JSON.stringify(salasPrivadas));
  renderSalasPrivadas();
}

function sortearPrivada(sala){
  const vencedorEmail = sala.participantes[
    Math.floor(Math.random() * sala.participantes.length)
  ];

  let usuarios = JSON.parse(localStorage.getItem("usuarios"));

  const total = sala.valor * 20;
  const premio = total * 0.80;
  const criadorBonus = total * 0.05;

  usuarios = usuarios.map(u=>{
    if(u.email === vencedorEmail){
      u.saldo += premio;
      alert("🎉 Vencedor da sala privada!\nPrêmio: R$ " + premio.toFixed(2));
    }
    if(u.email === sala.criador){
      u.saldo += criadorBonus;
    }
    return u;
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  sala.participantes = [];
}

renderSalasPrivadas();
