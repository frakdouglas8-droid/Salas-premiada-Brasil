// 🔐 Proteção de login
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if(!usuario){
  alert("Faça login");
  window.location.href = "login.html";
}

// ================== SALAS PÚBLICAS ==================
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

// Renderizar salas públicas
function renderSalas(){
  container.innerHTML = "";
  salas.forEach((sala,index)=>{
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

// Entrar em sala pública (COM SALDO)
function entrarSala(index){
  const sala = salas[index];

  if(sala.participantes.includes(usuario.email)){
    alert("Você já entrou nessa sala");
    return;
  }

  if(sala.participantes.length >= 20){
    alert("Sala cheia");
    return;
  }

  if(usuario.saldo < sala.valor){
    alert("Saldo insuficiente");
    return;
  }

  // desconta saldo
  usuario.saldo -= sala.valor;
  atualizarSaldoUsuario(usuario);

  sala.participantes.push(usuario.email);

  if(sala.participantes.length === 20){
    sortearPublica(sala);
  }

  localStorage.setItem("salas", JSON.stringify(salas));
  renderSalas();
}

// Sorteio sala pública
function sortearPublica(sala){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const vencedorEmail = sala.participantes[
    Math.floor(Math.random() * sala.participantes.length)
  ];

  const premio = sala.valor * 20 * 0.85;

  usuarios.forEach(u=>{
    if(u.email === vencedorEmail){
      u.saldo += premio;
      alert("🎉 Vencedor!\nPrêmio: R$ " + premio.toFixed(2));
      if(u.email === usuario.email){
        usuario.saldo += premio;
      }
    }
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  sala.participantes = [];
}

// ================== SALAS PRIVADAS ==================
const privContainer = document.getElementById("salasPrivadas");

// Renderiza privadas
function renderSalasPrivadas(){
  if(!privContainer) return;
  const salasPrivadas = JSON.parse(localStorage.getItem("salasPrivadas")) || [];
  privContainer.innerHTML = "";

  salasPrivadas.forEach((sala,index)=>{
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

// Entrar sala privada
function entrarPrivada(index){
  let salasPrivadas = JSON.parse(localStorage.getItem("salasPrivadas")) || [];
  const sala = salasPrivadas[index];

  const codigo = prompt("Digite o código");
  if(codigo !== sala.codigo){
    alert("Código inválido");
    return;
  }

  if(usuario.saldo < sala.valor){
    alert("Saldo insuficiente");
    return;
  }

  usuario.saldo -= sala.valor;
  atualizarSaldoUsuario(usuario);

  sala.participantes.push(usuario.email);

  if(sala.participantes.length === 20){
    sortearPrivada(sala);
    sala.participantes = [];
  }

  localStorage.setItem("salasPrivadas", JSON.stringify(salasPrivadas));
  renderSalasPrivadas();
}

// Sorteio privada
function sortearPrivada(sala){
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const vencedor = sala.participantes[
    Math.floor(Math.random() * sala.participantes.length)
  ];

  const total = sala.valor * 20;
  const premio = total * 0.80;
  const bonusCriador = total * 0.05;

  usuarios.forEach(u=>{
    if(u.email === vencedor) u.saldo += premio;
    if(u.email === sala.criador) u.saldo += bonusCriador;
    if(u.email === usuario.email){
      usuario.saldo = u.saldo;
    }
  });

  alert("🎉 Sala privada sorteada!");
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

// Atualizar saldo helper
function atualizarSaldoUsuario(user){
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios = usuarios.map(u=>{
    if(u.email === user.email){
      u.saldo = user.saldo;
    }
    return u;
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(user));
}

// Inicialização
renderSalas();
renderSalasPrivadas();
