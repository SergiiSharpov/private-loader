
module.exports = {
    functionDetermine: /[^\.]__[^\n]*\(/gm,
    functionName: /__(\w*)/gm,
    className: /class ([^\s]*)/gm,
    constructor: /(constructor.*\n)/gm,
    privateVar: /(this\.__)([^\s]*)/gm
};