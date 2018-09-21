const regexp = require('./regexp');

const searchBlock = (content, index = 0) => {

    let pos = index;
    let found = false;

    let firstSemi = false;
    let semicolons = -1;

    let start = -1;
    let end = -1;

    while(pos < content.length && !found) {

        switch (content[pos]) {
            case '{':
                semicolons++;
                if (!firstSemi) {
                    start = pos;
                }
                firstSemi = true;
                break;
            case '}':
                semicolons--;
                break;
        }

        if (firstSemi && semicolons < 0) {
            found = true;
            end = pos + 1;
        }

        pos++;
    }

    return {
        start,
        end
    }
};

const getPrivateFunction = (content) => {
    let reg = regexp.functionDetermine.exec(content);

    if (reg) {
        let block = searchBlock(content, reg.index);
        let mainContent = content.slice(reg.index, block.end);
        let name = reg[0].replace(/\W*/g, '').slice(2).trim();
        let resContent = mainContent.replace(/(__([^\(]*))/gm, `$2 = function `).trim();

        return {
            start: reg.index,
            end: block.end,
            content: resContent,
            name
        }
    }

    return null;
};

const getClass = (content) => {
    let reg = regexp.className.exec(content);

    if (reg) {
        let block = searchBlock(content, reg.index);
        let mainContent = content.slice(reg.index, block.end);

        return {
            start: reg.index,
            end: block.end,
            content: mainContent,
            name: reg[1]
        }
    }

    return null;
};

const getFunctionsMap = (content) => {
    let functionsMap = [];
    let contentMap = [];

    let func;
    while(func = getPrivateFunction(content)) {
        let begin = content.slice(0, func.start);
        content = content.slice(func.end);

        contentMap.push(begin);
        functionsMap.push(func);
    }

    contentMap.push(content);

    return {
        content: contentMap.join(''),
        map: functionsMap
    }
};

const getClassMap = (content) => {
    let contentMap = [];

    let currentClass;
    while(currentClass = getClass(content)) {
        let begin = content.slice(0, currentClass.start);
        content = content.slice(currentClass.end);

        contentMap.push({
            data: begin,
            isClass: false
        });

        contentMap.push({
            data: currentClass,
            isClass: true
        });
    }

    contentMap.push({
        data: content,
        isClass: false
    });

    return contentMap;
};

module.exports = {
    getFunctionsMap,
    getClassMap
};