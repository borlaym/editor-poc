const getParentInlineElement = element => {
    let parentElement = element.parentElement;
    while (parentElement.nodeName !== 'SPAN' && parentElement) {
        parentElement = parentElement.parentElement;
    }
    return parentElement;
};

export default getParentInlineElement;