import express from "express";
import config from './config.js';
import userRoutes from "./routes/user.routes.js";

const app = express ();

//setings
app.set('port', 3000/* config.port */);
app.use(userRoutes)
export default app;