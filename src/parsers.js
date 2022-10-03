import yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Неизвестное расширение файла: '${format}'`);
  }
};

export default parseData;
