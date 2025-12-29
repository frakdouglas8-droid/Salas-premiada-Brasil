document.getElementById("formCadastro").addEventListener("submit", function(e){
  e.preventDefault();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const novoUsuario = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    senha: document.getElementById("senha").value,
    saldo: 0
  };

  // Verifica se já existe
  const existe = usuarios.find(u =>
    u.email === novoUsuario.email || u.telefone === novoUsuario.telefone
  );

  if(existe){
    alert("Usuário já cadastrado!");
    return;
  }

  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
});
