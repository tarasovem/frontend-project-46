import stylish from './stylish.js';

const getFormatDiff = (tree, type) => {
  switch (type) {
    case 'stylish':
      return stylish(tree);
    default:
      return new Error(`Тип отображения ${type} не поддерживается`);
  }
};

export default getFormatDiff;
