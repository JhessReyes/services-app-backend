import express from "express";
import config from './config.js';
import './databases/conection';
const app = express ();

//setings
app.set('port', config.port);
export default app;