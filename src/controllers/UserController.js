const User = require('../models/User');
const { createToken } = require('../middlewares/Token');

module.exports = {
  async show(req, res) {
    const { tokenId } = req;
    const { user_id } = req.params;

    if (user_id != tokenId) {
      return res.status(401).json({ mensagem: 'Não autorizado.' });
    }

    const user = await User.findById({ _id: user_id }, '+senha');

    return res.status(200).json(user);
  },
  async store(req, res) {
    const { email } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(400).json({ mensagem: 'E-mail já existente' });
    }

    const user = await User.create(req.body).catch((err) => {
      return res.status(400).json({
        mensagem: 'Erro ao criar o usuário, verifique os dados enviados.',
      });
    });

    const token = createToken({
      id: user._id,
      nome: user.nome,
      email: user.email,
    });

    await User.findOneAndUpdate(
      { _id: user._id },
      { token, ultimo_login: Date.now() }
    );

    user.token = token;

    return res.status(201).json(user);
  },
};
