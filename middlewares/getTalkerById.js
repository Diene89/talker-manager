const fs = require('fs/promises');

const talkers = './talker.json';

const getTalkerById = async (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(await fs.readFile(talkers));
    const talker = data.find((r) => r.id === Number(id))
    if (!talker) return res.status(404).json({"message": "Pessoa palestrante não encontrada"});
    
    res.status(200).json(talker);
};

module.exports = getTalkerById;