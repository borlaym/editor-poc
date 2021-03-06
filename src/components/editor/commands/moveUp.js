// @flow
import type { BlockNode } from '../../block-nodes/types';

export default (body: Array<BlockNode>, node: BlockNode) => {
    const index = body.indexOf(node);
    const newIndex = Math.max(0, index - 1);
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
