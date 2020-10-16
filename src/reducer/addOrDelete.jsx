import _ from 'lodash';

const initTree = {
    id: "root",
    name: 'root',
    nodeType: 'folder',
    children: [],
    content: '',
    copyDictionary: {},
}

const getInitTime = () => { 
    return new Date().getTime() / 1000;
}

const addOrDelete = (state = initTree, action) => {
    switch (action.type) {
        case "ADD":
            console.log(action.folderId);
            if (action.name !== null) {
                var copy = Object.assign({}, state);
                var second = getInitTime();
                // console.log(action.folderId);
                if (action.folderId === "root") {
                    action.folderId = "" + copy.children.length;
                    copy.children.push({ id: action.folderId, name: action.name, nodeType: action.nodeType, children: [], content: second })
                } else {
                    const positionArray = action.folderId.split('-');
                    const level = positionArray.length;
                    var temp = copy.children
                    for (var i = 0; i < level; i++) {
                        console.log(temp)
                        temp = temp[positionArray[i]].children;
                        if (i === level - 1) {
                            action.folderId += "-" + temp.length;
                            console.log(action.folderId, i);
                            temp.push({ id: action.folderId, name: action.name, nodeType: action.nodeType, children: [], content: second })
                        }
                    }
                }
                return copy;
            }
            return state;
        case "DELETE":
            var copy = Object.assign({}, state);
            var positionArray = action.folderId.split('-');
            var level = positionArray.length;
            var temp = copy.children
            for (var i = 0; i < level; i++) {
                // console.log(temp);
                if (i == level - 1) {
                    // console.log(positionArray[i]);
                    for (var j = parseInt(positionArray[i]) + 1; j < temp.length; j++) {
                        var position = temp[j].id.lastIndexOf("-");
                        var index = position == -1 ? parseInt(temp[j].id) : parseInt(temp[j].id.substring(position + 1));
                        temp[j].id = position == -1 ? index - 1 + '' : (temp[j].id.substring(0, position + 1) + (index - 1) + "");
                        recursiveDeletChangeId(i, temp[j].children);
                    }
                    temp.splice([positionArray[i]], 1);
                } else {
                    temp = temp[positionArray[i]].children;
                }
            }
            return copy;

        case "COPYFOLDER":
            var copy = Object.assign({}, state);
            console.log(action.copyDictionary);
            copy.copyDictionary = action.copyDictionary;
            return copy;

        case "PASTEFOLDER":
            // console.log(copy.copyDictionary , action.folderId);
            var copy = Object.assign({}, state);
            if (action.folderId == "root") {
                var temp = copy;
            } else {
                var positionArray = action.folderId.split('-');
                var level = positionArray.length;
                var temp = copy.children
                for (var i = 0; i < level; i++) {
                    if (i === level - 1) {
                        temp = temp[positionArray[i]];
                    } else {
                        temp = temp[positionArray[i]].children;
                    }
                }
            }

            // var newDiction = Object.assign({}, copy.copyDictionary);
            var newDiction = _.cloneDeep(copy.copyDictionary);
            console.log(temp);
            var idStart = action.folderId == "root" ? (temp.children.length) + '' : temp.id + "-" + temp.children.length;
            newDiction.id = idStart
            newDiction.content = getInitTime();
            console.log(idStart);
            newDiction = recursiveChangeId(newDiction, newDiction.children);
            console.log(temp);
            temp.children.push(newDiction);

            // console.log(temp, newDiction);
            return copy;
        case "CHANGENAME":
            var copy = Object.assign({}, state);
            if (action.folderId == 'root') {
                console.log(action.folderId);
                copy.name = action.name;
            } else {
                var positionArray = action.folderId.split('-');
                var level = positionArray.length;
                var temp = copy.children
                for (var i = 0; i < level; i++) {
                    if (i == level - 1) {
                        temp[positionArray[i]].name = action.name;
                        console.log(temp[positionArray[i]]);
                    } else {
                        temp = temp[positionArray[i]].children;
                    }
                }
            }
            return copy;
        default:
            return state;
    }
}


const recursiveDeletChangeId = (index, dic) => {
    for (var i = 0; i < dic.length; i++) {
        // console.log(dic, dic.id);
        var indexArray = dic[i].id.split('-');
        indexArray[index] = (parseInt(indexArray[index]) - 1) + "";
        var newId = "";
        for (var n in indexArray) {
            newId += indexArray[n] + "-";
        }
        dic[i].id = newId.substring(0, newId.length - 1);
        recursiveDeletChangeId(index, dic[i].children);
    }
}

const recursiveChangeId = (newDiction, children) => {
    {
        for (var i = 0; i < children.length; i++) {
            var position = children[i].id.lastIndexOf("-");
            var idStart = newDiction.id + '-' + children[i].id.substring(position + 1) + '';
            children[i].id = idStart;
            children[i].content = getInitTime();
            console.log(idStart);
            recursiveChangeId(newDiction.children[i], newDiction.children[i].children);

        }
    }
    return newDiction;
}

export default addOrDelete



