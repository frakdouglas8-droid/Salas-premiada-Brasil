document.getElementById("formLogin").addEventListener("submit", async function(e){
  e.preventDefault();

  const dados = {
    login: usuario.value,
    senha: senha.value
  };

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const json = await res.json();

    if(!res.ok){
      alert(json.erro);
      return;
    }

    // salva usuário logado (sessão simples)
    localStorage.setItem("usuarioLogado", JSON.stringify(json.usuario));

    window.location.href = "salas.html";

  } catch (err) {
    alert("Erro ao conectar com o servidor");
  }
});
