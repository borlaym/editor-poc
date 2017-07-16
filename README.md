# Editor React rewrite proof of concept

- Inited with react-create-app and storybook
- After clone `npm install`, then `npm run storybook`

General idea:
- At the top sits the Editor component, that receives as props the whole Post model. It contains the toolbars and modifies the state, then fires an `onChange` event. It also renders the body.
- The main benefit of this approach is that the Editor has a (preferably immutable) model for the body, a list of BlockNodes, and all actions cause changes in that model, which triggers a rerender. This one way data flow, much like in flux and redux, makes everything more maintainable, testable and easier to understand / reason about.
- Block node components receive the node itself, as well as various options from the editor. One of the props is `hasFocus` which allows the component to display itself differently based on whether it is the currently selected item. A good example is the floating toolbar, which is rendered by every blocknode themselves, or the image caption, which is a text if the node is not selected, an input otherwise. And this is exactly how we can easily implement WYSIWYG behaviors.
- When you directly alter a node's properties, like the `caption` or `alignment` properties of the Image blocknode, they fire a simple `onChange` event, that modifies them right in the model of the editor. However, some actions like moving blocknodes up and down inside the editor requires more than just the information of a particular node. So in the floating toolbar, they fire *commands*, through the `onCommand` property. This way they can pass themselves and any command string to the editor, which then can handle the command with the full knowledge of the whole model

Things to tackle:
- The contentEditable node is going to take some work. We either implement one from scratch, or find an existing solution that is not as heavy as draft.js