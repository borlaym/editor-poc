// @flow

const getTextNode: (Node => ?Node) = node => {
    let pointer = node;
    while (pointer && pointer.childNodes && pointer.childNodes.length) {
        pointer = pointer.firstChild;
    }
    return pointer;
};

export default getTextNode;