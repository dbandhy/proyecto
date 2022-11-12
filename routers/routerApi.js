const express = require("express");
const { controladorGetPelis,
        controladorGetPelisSegunId,
        controladorPostPelis,
        controladorPutPelisSegunId,
        controladorDeletePelisSegunId } = require("../controllers/controladorGetCosas");

// API REST // DEVUELVEN DATOS
//obtener el GET del controlador POST
const routerApi = express.Router();

routerApi.get("/", controladorGetPelis, routerApi);
routerApi.get("/:id", controladorGetPelisSegunId);
routerApi.post("/", controladorPostPelis);
routerApi.put("/:id", controladorPutPelisSegunId);
routerApi.delete("/:id", controladorDeletePelisSegunId);

exports.routerApi = routerApi;