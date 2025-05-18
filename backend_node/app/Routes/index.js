const path = require('path');

const File = require('../Utils/File');

async function initRoutes(app, router) {

    const routesPath = path.join(__dirname, '../Routes/');

    const files = await File.getFiles(routesPath);

    files.filter((file) => file.endsWith('Routes.js')).forEach((file) => require(path.join(routesPath, file))(app, router));// eslint-disable-line
}

module.exports = initRoutes;
