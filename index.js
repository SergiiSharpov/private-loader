const Search = require('./utils/search');
const Template = require('./utils/templateES6');

function privateLoader(source, map) {
    this.cacheable && this.cacheable();

    let classMap = Search.getClassMap(source);

    return classMap.reduce((prev, current) => {
        let result = '';

        if (current.isClass) {
            result = Template.replaceVariables(current.data.content);
            let funcMap = Search.getFunctionsMap(result);
            result = Template.updateConstructor(funcMap.content, funcMap.map);
            result = Template.incapsulate(current.data.name, result);
        } else {
            result = current.data;
        }

        return prev + result;
    }, '');
}

module.exports = privateLoader;