import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const status = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const getNormalizedData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return JSON.parse(readFileSync(absolutePath, 'utf-8'));
};

const renderDiff = (diff) => {
  const diffList = [];

  diff.forEach((item) => {
    diffList.push(`${item.status} ${item.key}: ${item.value}`);
  });

  const str = {
    start: '{\n  ',
    end: '\n}',
    body: diffList.join('\n  '),
  };

  return str.start + str.body + str.end;
};

const getDiff = (filepath1, filepath2) => {
  const data1 = getNormalizedData(filepath1);
  const data2 = getNormalizedData(filepath2);
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const result = [];

  keys.forEach((item) => {
    if (_.has(data1, item) && !_.has(data2, item)) {
      result.push({
        key: item,
        value: data1[item],
        status: status.removed,
      });
    }

    if (!_.has(data1, item) && _.has(data2, item)) {
      result.push({
        key: item,
        value: data2[item],
        status: status.added,
      });
    }

    if (_.has(data1, item) && _.has(data2, item) && data1[item] === data2[item]) {
      result.push({
        key: item,
        value: data2[item],
        status: status.unchanged,
      });
    }

    if (_.has(data1, item) && _.has(data2, item) && data1[item] !== data2[item]) {
      result.push({
        key: item,
        value: data1[item],
        status: status.removed,
      });
      result.push({
        key: item,
        value: data2[item],
        status: status.added,
      });
    }
  });
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const diff = getDiff(filepath1, filepath2);
  return renderDiff(diff);
};

/* const genDiff = (filepath1, filepath2) => {
  return filepath1 + filepath2;
}; */

export default genDiff;
