import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const formatedString = Object.entries(value).map(([key, innerValue]) => {
    const object = { key, value: innerValue };
    return `${indent(depth)}  ${object.key}: ${formatValue(object.value, depth + 1)}`;
  });
  return `{\n${formatedString.join('\n')}\n${indent(depth - 1)}  }`;
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `${indent(depth)}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'removed':
        return `${indent(depth)}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent(depth)}  ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'changed': {
        const firstStr = `${indent(depth)}- ${node.key}: ${formatValue(node.value1, depth + 1)}`;
        const secondStr = `${indent(depth)}+ ${node.key}: ${formatValue(node.value2, depth + 1)}`;
        return [firstStr, secondStr];
      }
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.value, depth + 1).join('\n')}\n${indent(depth)}  }`;
      default:
        throw new Error(`Неизвестный тип diff: '${node.type}'`);
    }
  });
  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default stylish;
