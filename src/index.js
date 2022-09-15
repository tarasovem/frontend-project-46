import { readFileSync } from 'fs';
import _ from 'lodash';

const status = {
  added: '+',
  removed: '-',
  unchanged: ' '
}

const getNormalizedData = (filepath) => JSON.parse(readFileSync(filepath, 'utf-8'));

const createRecord = (key, value, status) => {
  return { key, value, status };
};

const sortDiff = (prev, next) => {
  if (prev.key > next.key) return 1;
  if (prev.key < next.key) return -1;
  if (prev.key === next.key) return 0;
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
  const diffs = getDiff(filepath1, filepath2);
  diffs.sort(sortDiff);
  return diffs;
};

export default genDiff;
