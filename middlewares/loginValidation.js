const crypto = require('crypto');

const emailRegex = /\S+@\S+\.\S+/;

const emailValidation = (email, res) => {
    if (!email || email.length === 0) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!email.match(emailRegex)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
};
const passwordValidation = (password, res) => {
    if (!password || password === 0) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

//  const generateToken = () => {
//     const tokenRegex = new RegExp(/^[a-zA-Z0-9]{16}$/);
//      return tokenRegex;
// };
//----------------------------------------------------------------------------------

const loginValidation = (req, res) => {
        const { email, password } = req.body;
        emailValidation(email, res);
        passwordValidation(password, res);
        const token = generateToken();
        return res.status(200).json({ token });
};

module.exports = loginValidation;
