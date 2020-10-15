const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    telefones: [
      {
        numero: String,
        ddd: String,
      },
    ],
    senha: {
      type: String,
      required: true,
      select: false,
    },
    ultimo_login: {
      type: Date,
      default: Date.now(),
    },
    token: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' },
  }
);

UserSchema.pre('save', async function () {
  this.senha = await bcryptjs.hash(this.senha, 1);
});

UserSchema.pre('updateOne', async function () {
  const pass = this.getUpdate().senha;

  if (pass) this.getUpdate().senha = bcryptjs.hashSync(pass, 10);
});

module.exports = model('User', UserSchema);
