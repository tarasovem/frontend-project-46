import stylish from './stylish.js';
import plain from './plain.js';

const getFormatDiff = (tree, type) => {
  switch (type) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      return new Error(`Тип отображения ${type} не поддерживается`);
  }
};

export default getFormatDiff;
