const express = require( 'express');
const app = require('./src/app.js');
/* const app = express(); */
app.listen(app.get('port'));

console.log("Server on Port", app.get('port'));