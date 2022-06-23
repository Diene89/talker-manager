const fs = require('fs/promises');
const getTalkers = require('./getTalkers');

const writeTalkers = async (data) => {
    const talkers = await getTalkers();
    talkers.push(data);
    const talkersConvert = JSON.stringify(talkers);
    await fs.writeFile('./talker.json', talkersConvert);
};

module.exports = writeTalkers;