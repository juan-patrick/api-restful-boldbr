const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { createToken } = require('../middlewares/Token');

module.exports = {
  async store(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({ email: email }, '+senha').catch((err) => {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos' });
    });

    if (!user) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    if (!(await bcryptjs.compare(senha, user.senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const token = createToken({
      id: user._id,
      nome: user.nome,
      email: user.email,
    });
    
    await User.findOneAndUpdate(
      { _id: user._id },
      { token, ultimo_login: Date.now() }
    );

    user.ultimo_login = Date.now();
    user.token = token;


    return res.status(200).json(user);
  },
};
