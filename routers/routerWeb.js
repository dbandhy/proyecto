const express = require("express");
const { controladorGetRoot,
     controladorGetBienvenida,
      controladorGetDespedida } = require("../controllers/controladorGetRoot.js");

//Router
const routerWeb = express.Router();
exports.routerWeb = routerWeb;


// WEB SERVER // DEVUELVEN PÁGINAS
routerWeb.get("/", controladorGetRoot);
routerWeb.get("/bienvenida", controladorGetBienvenida);
routerWeb.get("/despedida", controladorGetDespedida);
