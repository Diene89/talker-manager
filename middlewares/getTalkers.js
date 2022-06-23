const fs = require('fs/promises');

const talkers = './talker.json';
const empty = [];

const getTalkers = async (_req, res) => {
    const data = JSON.parse(await fs.readFile(talkers));
    return !data
    ? res.status(200).json(empty)
    : res.status(200).json(data)
};

module.exports = getTalkers;
