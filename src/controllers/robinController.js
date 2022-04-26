import robin from "../services/round_robin"
let getHomePage = (req, res) => {

};

let getRobin_1 = async (req, res) => {
    var data = robin.getRobin_1();
    res.send(data);
}

let getRobin = async (req, res) => {
    var pattern = /^([0-9]+\s)*$/;
    var input = req.body.data.input;
    if (pattern.test(input) == false) {
        res.send([]);
    }
    var data = '';
    switch (req.body.data.type) {
        case 'FCFS':
            data = robin.getFCFS(input);
            break;
        case 'SJF':
            data = robin.getSJF(input);
            break;
        case 'SRTF':
            data = robin.getSRTF(input);
            break;
        case 'RR':
            data = robin.getRobin(input);
            break;
        default:
            data = robin.getRobin(input);

    }
    res.send(data);
}
module.exports = {
    getRobin: getRobin,
    getRobin_1: getRobin_1,
    getHomePage: getHomePage,
};
