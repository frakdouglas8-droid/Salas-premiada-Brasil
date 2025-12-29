const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuario){
  alert("Faça login");
  window.location.href = "login.html";
}

let valorPix = 0;

document.getElementById("formRecarga").addEventListener("submit", function(e){
  e.preventDefault();

  valorPix = parseFloat(document.getElementById("valorRecarga").value);

  if(valorPix <= 0){
    alert("Valor inválido");
    return;
  }

  document.getElementById("pixArea").style.display = "block";
});

function confirmarPix(){
  usuario.saldo += valorPix;

  // atualiza usuários
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios = usuarios.map(u=>{
    if(u.email === usuario.email){
      u.saldo = usuario.saldo;
    }
    return u;
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  alert("✅ PIX confirmado!\nSaldo atualizado.");
  window.location.href = "carteira.html";
}
