
module.exports = {
    functionDetermine: /[^\.]__[^\n]*\(/gm,
    className: /class ([^\s]*)/gm,
    constructor: /(constructor.*\n)/gm,
    privateVar: /(this\.__)([^\s]*)/gm
};