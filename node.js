// Endpoint para receber webhook do PIX
app.post('/webhook-pix', async (req, res) => {
    const { pagamentoId, status, valor } = req.body;

    // Atualiza status no banco
    const pagamento = await db.pagamentos.findById(pagamentoId);
    if (!pagamento) return res.status(404).send('Pagamento não encontrado');

    if (status === 'concluido') {
        pagamento.status = 'concluido';
        await pagamento.save();

        // Atualiza saldo do usuário
        const usuario = await db.usuarios.findById(pagamento.usuario_id);
        usuario.saldo += valor;
        await usuario.save();
    }

    res.status(200).send('OK');
});
