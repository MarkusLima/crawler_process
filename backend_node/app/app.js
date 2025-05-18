const Log = require('./Utils/Log');

const app = require('./server')();
const { version } = require('../package.json');

const port = app.get('port');

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
    Log.info(`Servidor HTTP rodando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.send(`API versão ${version}`);
});
