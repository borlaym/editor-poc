const getTextNode = node => {
    let pointer = node;
    while (pointer.childNodes && pointer.childNodes.length) {
        pointer = pointer.firstChild;
    }
    return pointer;
};

export default getTextNode;