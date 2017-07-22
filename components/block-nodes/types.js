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
}

export type BlockNode = Image;

export type Command = $Keys<Commands>;

export type CommandHandler = (BlockNode, Command) => void;
export type ChangeHandler = (BlockNode, BlockNode) => void;

export type EditorBlockNodeProps<BlockNodeType> = {
    node: BlockNodeType,
    hasFocus: boolean,
    onCommand: CommandHandler,
    onChange: ChangeHandler
};
