export default (body, node) => {
    const index = body.indexOf(node);
    const newIndex = Math.min(body.length - 1, index + 1);
    const bodyWithoutNode = [
        ...body.slice(0, index),
        ...body.slice(index + 1)
    ];
    return [
        ...bodyWithoutNode.slice(0, newIndex),
        node,
        ...bodyWithoutNode.slice(newIndex)
    ]
};
