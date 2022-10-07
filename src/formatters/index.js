import stylish from './stylish.js';
import plain from './plain.js';

const getFormatDiff = (tree, type) => {
  switch (type) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Неподдерживаемый тип отображения: '${type}'`);
  }
};

export default getFormatDiff;
