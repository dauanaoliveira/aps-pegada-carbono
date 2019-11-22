const mongoose = require('../database');

// === Modelo da collection de usuarios ===
const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    energiaCO2: {
        type: Number
    },
    aguaCO2: {
        type: Number
    },
    carroCO2: {
        type: Number
    },
    motoCO2: {
        type: Number
    },
    tremCO2: {
        type: Number
    },
    metroCO2: {
        type: Number
    },
    onibusCO2: {
        type: Number
    },
    TotalEmissaoKgCO2: {
        type: Number
    },
    dataCriacao: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;