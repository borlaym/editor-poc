export default node => {
    switch(node.type) {
        case 'Header':
            return 'h' + node.level;
        case 'Paragraph':
        default:
            return 'p';
    }
};