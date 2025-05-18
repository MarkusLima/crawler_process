const fs = require('fs').promises; // Importa fs.promises para operações assíncronas
const path = require('path');

const Log = require('./Log');

class File {

    static async getFiles(diretorio, options = {}) {
        try {
            return await fs.readdir(diretorio, options);
        } catch (err) {
            Log.info(`Erro ao ler o diretório ${diretorio}: ${err}`);
            return [];
        }
    }

}

module.exports = File;
