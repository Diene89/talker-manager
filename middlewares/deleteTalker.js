const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const talkers = JSON.parse(await fs.readFile('./talker.json'));
    const foundTalker = talkers.find((talker) => talker.id === Number(id));
    const talkerIndex = talkers.indexOf(foundTalker);
    talkers.splice(talkerIndex, 1);
    const talkersConvert = JSON.stringify(talkers);
    await fs.writeFile('./talker.json', talkersConvert);
    return res.status(204).end();
};

module.exports = deleteTalker;