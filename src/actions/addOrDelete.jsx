export function addF(name, folderId, nodeType) {
    return {
        type: "ADD",
        name,
        folderId,
        nodeType
    }
}

export function deleteF(folderId) {
    return {
        type: "DELETE",
        folderId
    }
}

export function copyFolder(copyDictionary) {
    return {
        type: "COPYFOLDER",
        copyDictionary,
    }
}

export function pasteFolder(folderId) {
    return {
        type: "PASTEFOLDER",
        folderId,
    }
}

export function changeName(name, folderId) {
    return {
        type: "CHANGENAME",
        name,
        folderId,
    }
}