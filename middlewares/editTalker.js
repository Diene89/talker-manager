const fs = require('fs').promises;

const editTalker = async (req, res) => {
//    const { name, age, talk } = req.body;
    const { id } = req.params;
    const talkers = JSON.parse(await fs.readFile('./talker.json'));
    const foundTalker = talkers.find((talker) => talker.id === Number(id));
    if (!foundTalker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    req.body.id = Number(id);
    const talkerIndex = talkers.indexOf(foundTalker);
    talkers.splice(talkerIndex, 1, req.body);
    console.log('qwe', talkers);
    const talkersConvert = JSON.stringify(talkers);
    await fs.writeFile('./talker.json', talkersConvert);
    return res.status(200).json(req.body);
};

module.exports = editTalker;
