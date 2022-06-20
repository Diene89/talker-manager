const fs = require('fs/promises');

const talkers = './talker.json';

const getTalkers = async (_req, res) => {
    const data = JSON.parse(await fs.readFile(talkers));
    if (!data) return res.status(200).json([]);
    
    res.status(200).json(data);
};

module.exports = getTalkers;
