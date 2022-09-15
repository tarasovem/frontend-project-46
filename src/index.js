import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const status = {
  added: '+',
  removed: '-',
  unchanged: ' '
}

const getNormalizedData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return JSON.parse(readFileSync(absolutePath, 'utf-8'));
};

const createRecord = (key, value, status) => {
  return { key, value, status };
};

const sortDiff = (prev, next) => {
  if (prev.key > next.key) return 1;
  if (prev.key < next.key) return -1;
  if (prev.key === next.key) return 0;
};

const renderDiff = (diff) => {
  const diffList = [];

  diff.forEach(({ key, value, status}) => {
    diffList.push(`${status} ${key}: ${value}`);
  });

  const str = {
    start: `\n{\n  `,
    end: `\n}\n`,
    body: diffList.join('\n  ')
  };

  return str.start + str.body + str.end;
};

const getDiff = (filepath1, filepath2) => {
  const initialData = getNormalizedData(filepath1);
  const comparedData = getNormalizedData(filepath2);
  const result = [];

  for (let [ key, value ] of _.entries(initialData)) {
    let record;

    if (!_.has(comparedData, key)) {
      record = createRecord(key, value, status.removed);
      result.push(record);
    }

    if (_.has(comparedData, key) && comparedData[key] === value) {
      record = createRecord(key, value, status.unchanged);
      result.push(record);
      delete comparedData[key];
    }

    if (_.has(comparedData, key) && comparedData[key] !== value) {
      const firstRecord = createRecord(key, value, status.removed);
      const secondRecord = createRecord(key, comparedData[key], status.added);
      result.push(firstRecord, secondRecord);
      delete comparedData[key];
    }
  }

  if (!_.isEmpty(comparedData)) {
    for (let [ key, value ] of _.entries(comparedData)) {
      const record = createRecord(key, value, status.added);
      result.push(record);
    }
  }

  return result;
};

const genDiff = (filepath1, filepath2) => {
  const diff = getDiff(filepath1, filepath2);
  diff.sort(sortDiff);
  return renderDiff(diff);
};

export default genDiff;
