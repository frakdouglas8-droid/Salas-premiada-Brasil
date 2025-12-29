const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuario){
  alert("Faça login");
  window.location.href = "login.html";
}

document.getElementById("saldo").innerText = usuario.saldo.toFixed(2);

function voltar(){
  window.location.href = "salas.html";
}
