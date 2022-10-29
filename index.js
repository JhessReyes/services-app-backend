import express from 'express';
import app from './src/app.js';

app.listen(app.get('port'));

console.log("Server on Port", app.get('port'));