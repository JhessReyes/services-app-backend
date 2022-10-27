const express = require( 'express');
const app = require('./src/app.js');
/* const app = express(); */
app.listen(app.get('port'));

console.log("Server on Ports ", app.get('port'));