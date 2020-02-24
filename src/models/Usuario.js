const mongoose = require('mongoose');

const SchemaFornecedor = new mongoose.Schema({
  nome_fornecedor: {
    type: String,
    default: null,
  },
  fornecedor_id: {
    type: String,
    default: null,
  },
  fornecedor_data: {
    type: {},
    default: null,
  },
});

const SchemaUsuario = new mongoose.Schema(
  {
    nome: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_verificado: {
      type: Boolean,
      default: false,
    },
    senha: {
      type: String,
    },
    codigo_referencia: {
      type: String,
      default: function() {
        let hash = 0;
        for (let i = 0; i < this.email.length; i++) {
          hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
        }
        let res = (hash & 0x00ffffff).toString(16).toUpperCase();
        return '00000'.substring(0, 6 - res.length) + res;
      },
    },
    referido_por: {
      type: String,
      default: null,
    },
    autenticacao_de_terceiros: [SchemaFornecedor],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = Usuario = mongoose.model('usuario', SchemaUsuario);
