const fs = require('fs').promises;

const getTalkers = async (_req, res) => {
    const data = JSON.parse(await fs.readFile('./talker.json'));
    return !data
    ? res.status(200).json([])
    : res.status(200).json(data);
};

module.exports = getTalkers;
