const Search = require('./utils/search');
const Template = require('./utils/templateES6');

const privateLoader = (source) => {

    let classMap = Search.getClassMap(source);

    return classMap.reduce((prev, current) => {
        let result = '';

        if (current.isClass) {
            let funcMap = Search.getFunctionsMap(current.data.content);
            result = Template.replaceVariables(funcMap.content);
            result = Template.updateConstructor(result, funcMap.map);
            result = Template.incapsulate(current.data.name, result);
        } else {
            result = current.data;
        }

        return prev + result;
    }, '');
};

module.exports = privateLoader;