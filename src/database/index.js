const mongoose = require('mongoose');

// === Conexao do banco (Local) ===
mongoose.connect('mongodb://localhost/pegada-carbono', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;