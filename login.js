// LOGIN
document.getElementById("formLogin")?.addEventListener("submit", function(e){
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const user = usuarios.find(u =>
    (u.email === usuario || u.telefone === usuario) && u.senha === senha
  );

  if(!user){
    alert("Usuário ou senha incorretos");
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(user));
  window.location.href = "salas.html";
});
