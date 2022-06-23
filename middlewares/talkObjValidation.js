const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

const talkValidation = (talk, res) => {
    // const { talk } = req.body;
    
    if(!talk) return res.status(400).json({ "message": "O campo \"talk\" é obrigatório" });
}

const watchedAtValidation = (talk, res) => {
    //const { talk } = req.body;
    if(!talk.watchedAt) return res.status(400).json({ "message": "O campo \"watchedAt\" é obrigatório" });

    if(!talk.watchedAt.match(dateRegex)) return res.status(400).json({ "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"" });
}

const rateValidation = (talk, res) => {
    //const { talk } = req.body;
    if(!talk.rate || talk.rate === '') return res.status(400).json({ "message": "O campo \"rate\" é obrigatório" });

    if(!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) return res.status(400).json({ "message": "O campo \"rate\" deve ser um inteiro de 1 à 5" });
}

const talkObjValidation = (req, res) => {
    const { talk } = req.body;
    talkValidation(talk, res);
    watchedAtValidation(talk, res);
    rateValidation(talk, res);
}

module.exports = talkObjValidation;