const regexp = require('./regexp');

module.exports = {
    replaceVariables: (content) => {
        return content.replace(regexp.privateVar, 'privateMap.get(this).$2');
    },
    updateConstructor: (content, functionsMap = null) => {
        let funcContent = '';

        if (functionsMap && functionsMap.length) {
            funcContent = functionsMap.reduce((prev, current) => {
                let funcDet = `privateMap.get(this).${current.content};\n`;
                let funcBind = `privateMap.get(this).${current.name}.bind(this);\n`;
                return prev + funcDet + funcBind;
            }, '');
        }

        return content.replace(regexp.constructor, `$1\tprivateMap.set(this, {});\n${funcContent}`);
    },
    incapsulate: (name, content) => {
        return `const ${name} = (() => {
            const privateMap = new WeakMap();
            ${content}
            return ${name};
        })();`;
    }
};