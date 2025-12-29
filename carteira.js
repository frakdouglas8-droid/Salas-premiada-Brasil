// carteira.js
document.addEventListener("DOMContentLoaded", function(){
    const logado = JSON.parse(localStorage.getItem('logado'));
    if(!logado) { alert("Faça login!"); window.location = 'index.html'; return; }
    
    const saldoEl = document.getElementById('saldoUsuario');
    saldoEl.innerText = logado.saldo.toFixed(2);

    document.getElementById('btnRecarga').addEventListener('click', function(){
        const valor = parseFloat(prompt("Digite o valor da recarga (R$)"));
        if(!valor || valor <= 0) return;
        logado.saldo += valor;
        saldoEl.innerText = logado.saldo.toFixed(2);
        atualizarUsuario(logado);
        alert("Recarga realizada!");
    });

    document.getElementById('btnSacar').addEventListener('click', function(){
        const valor = parseFloat(prompt("Digite o valor para saque (R$)"));
        if(!valor || valor <= 0) return;
        if(valor > logado.saldo){ alert("Saldo insuficiente!"); return; }
        logado.saldo -= valor;
        saldoEl.innerText = logado.saldo.toFixed(2);
        atualizarUsuario(logado);
        alert("Saque realizado com sucesso!");
    });
});

function atualizarUsuario(user){
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || "[]");
    const index = usuarios.findIndex(u => u.email === user.email);
    usuarios[index] = user;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
