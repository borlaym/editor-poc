// @flow

const getParentInlineElement: (HTMLElement => ?HTMLElement) = element => {
    let parentElement = element.parentElement;
    while (parentElement && parentElement.nodeName !== 'SPAN') {
        parentElement = parentElement.parentElement;
    }
    if (parentElement instanceof HTMLElement) {
        return parentElement;
    }
    return null;
};

export default getParentInlineElement;