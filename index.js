const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const getTalkers = require('./middlewares/getTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const loginValidation = require('./middlewares/loginValidation');
const tokenValidation = require('./middlewares/tokenValidation');
const talkValidation = require('./middlewares/talkValidation');
const userValidation = require('./middlewares/userValidation');
const rateValidation = require('./middlewares/rateValidation');
const watchedAtValidation = require('./middlewares/watchedAtValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use((req, _res, next) => {
  console.log('req.method:', req.method);
  console.log('req.path:', req.path);
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  console.log('req.headers:', req.headers);
  console.log('req.body:', req.body);
  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// - Requisito 1
app.get('/talker', getTalkers);

// - Requisito 2
app.get('/talker/:id', getTalkerById);

// - Requisito 3 e 4
app.post('/login', loginValidation);

// - Requisito 5
app.post('/talker', tokenValidation, userValidation,
talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  const { name, age, talk } = req.body; 
  const talkers = JSON.parse(await fs.readFile('./talker.json'));
  const id = Number(talkers[talkers.length - 1].id) + 1;
  const newTalk = { name, age, talk, id };
  talkers.push(newTalk);
  const talkersConvert = JSON.stringify(talkers);
  await fs.writeFile('./talker.json', talkersConvert);
  res.status(201).json(newTalk);
});

app.listen(PORT, () => {
  console.log('Online');
});
