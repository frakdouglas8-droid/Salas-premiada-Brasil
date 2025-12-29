const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if(!usuario){
  alert("Faça login");
  window.location.href = "login.html";
}

document.getElementById("formSala").addEventListener("submit", function(e){
  e.preventDefault();

  const valor = parseFloat(document.getElementById("valor").value);
  const codigo = document.getElementById("codigo").value;

  let salasPrivadas = JSON.parse(localStorage.getItem("salasPrivadas")) || [];

  salasPrivadas.push({
    valor,
    codigo,
    criador: usuario.email,
    participantes: []
  });

  localStorage.setItem("salasPrivadas", JSON.stringify(salasPrivadas));

  alert("Sala privada criada!\nCódigo: " + codigo);
  window.location.href = "salas.html";
});
