// @flow

import * as Commands from '../commands';

export type Image = {
    type: string,
    id: number,
    format: 'jpg' | 'png' | 'gif' | 'png' | 'svg',
    width?: number,
    height?: number,
    url?: string,
    alignment: 'Left' | 'Center' | 'Bleed' | 'Right' | 'FullWidth',
    caption?: string,
    altText?: string
};

export type InlineNodeStyle = 'Bold' | 'Italic';

export type InlineTextNode = {
    type: 'Text',
    styles: Array<InlineNodeStyle>,
    value: string
};

export type InlineLinkNode = {
    type: 'Link',
    reference: string,
    target: string,
    value: Array<InlineTextNode>
};

export type InlineLineBreakNode = {
    type: 'LineBreak'
};

export type InlineNode = InlineLinkNode | InlineTextNode | InlineLineBreakNode;

export type Paragraph = {
    type: string,
    value: Array<InlineNode>
};

export type BlockNode = Image | Paragraph;

export type Command = $Keys<Commands>;

export type CommandHandler = (BlockNode, Command) => void;
export type ChangeHandler = (BlockNode, BlockNode) => void;

export type EditorBlockNodeProps<BlockNodeType> = {
    node: BlockNodeType,
    hasFocus: boolean,
    onCommand: CommandHandler,
    onChange: ChangeHandler
};
