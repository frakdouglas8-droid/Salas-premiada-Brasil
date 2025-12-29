document.getElementById("formLogin").addEventListener("submit", function(e){
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const encontrado = usuarios.find(u =>
    (u.email === usuario || u.telefone === usuario) && u.senha === senha
  );

  if(!encontrado){
    alert("Usuário ou senha inválidos");
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(encontrado));
  window.location.href = "salas.html";
});
