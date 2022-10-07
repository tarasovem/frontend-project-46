import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) === true) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

export default (diff) => {
  const iter = (tree, acc) => {
    const result = tree.map((node) => {
      const path = [...acc, node.key].join('.');
      switch (node.type) {
        case 'added':
          return `Property '${path}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested':
          return `${iter(node.value, [path])}`;
        default:
          throw new Error(`Неизвестный тип diff: '${node.type}'`);
      }
    });
    return _.compact(result).join('\n');
  };
  return iter(diff, []);
};
