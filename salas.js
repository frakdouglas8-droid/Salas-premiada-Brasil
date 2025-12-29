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

  // já entrou
  if(sala.participantes.includes(usuario.email)){
    alert("Você já entrou nessa sala!");
    return;
  }

  // sala cheia
  if(sala.participantes.length >= 20){
    alert("Sala cheia!");
    return;
  }

  // 🔒 VERIFICA SALDO
  if(usuario.saldo < sala.valor){
    alert("Saldo insuficiente para entrar nessa sala.");
    return;
  }

  // 💸 DESCONTA SALDO
  usuario.saldo -= sala.valor;

  // atualiza usuário logado
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  // atualiza lista de usuários
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios = usuarios.map(u => {
    if(u.email === usuario.email){
      u.saldo = usuario.saldo;
    }
    return u;
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // entra na sala
  sala.participantes.push(usuario.email);

  // 🔥 SORTEIO AO LOTAR
  if(sala.participantes.length === 20){
    const vencedorEmail = sala.participantes[
      Math.floor(Math.random() * sala.participantes.length)
    ];

    const valorTotal = sala.valor * 20;
    const premio = valorTotal * 0.85; // 85% vencedor

    usuarios = usuarios.map(u => {
      if(u.email === vencedorEmail){
        u.saldo += premio;
        if(u.email === usuario.email){
          usuario.saldo += premio;
          localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        }
        alert(
          "🎉 Sorteio concluído!\n\n" +
          "Vencedor: " + u.nome + "\n" +
          "Prêmio: R$ " + premio.toFixed(2)
        );
      }
      return u;
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // zera a sala
    sala.participantes = [];
  }

  localStorage.setItem("salas", JSON.stringify(salas));
  renderSalas();
}

