const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuario){
  alert("Você precisa estar logado");
  window.location.href = "login.html";
}

// Garantir que a lista exista
let salasPrivadas = JSON.parse(localStorage.getItem("salasPrivadas")) || [];

document.getElementById("formCriarSala").addEventListener("submit", function(e){
  e.preventDefault();

  const valor = parseFloat(document.getElementById("valorSala").value);
  const codigo = document.getElementById("codigoSala").value;

  if(!valor || !codigo){
    alert("Preencha tudo");
    return;
  }

  const novaSala = {
    valor: valor,
    codigo: codigo,
    criador: usuario.email,
    participantes: []
  };

  salasPrivadas.push(novaSala);

  alert(
    "Sala criada com sucesso!\n\n" +
    "Valor: R$ " + valor + "\n" +
    "Código: " + codigo
  );

  window.location.href = "salas.html";
});
