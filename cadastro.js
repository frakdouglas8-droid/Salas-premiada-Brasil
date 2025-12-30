document.getElementById("formCadastro").addEventListener("submit", async function(e){
  e.preventDefault();

  const dados = {
    nome: nome.value,
    email: email.value,
    telefone: telefone.value,
    senha: senha.value
  };

  try {
    const res = await fetch("http://localhost:3000/api/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const json = await res.json();

    if(!res.ok){
      alert(json.erro);
      return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";

  } catch (err) {
    alert("Erro ao conectar com o servidor");
  }
});

