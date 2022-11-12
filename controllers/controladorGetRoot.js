// funciones GET
function controladorGetRoot(req, res) {
    res.send("todo bien");
}

exports.controladorGetRoot = controladorGetRoot;
//con json devuelve el objeto
function controladorGetBienvenida(req, res) {
    res.json({ mensaje: "Bienvenida" });
}
exports.controladorGetBienvenida = controladorGetBienvenida;
function controladorGetDespedida(req, res) {
    res.send("Despedida");
}
exports.controladorGetDespedida = controladorGetDespedida;
