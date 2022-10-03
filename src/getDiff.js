import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import parseData from './parsers.js';

const getNormalizedData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(absolutePath, 'utf-8');
  const format = path.extname(filepath);
  return parseData(data, format);
};

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { type: 'nested', key, value: buildTree(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'changed', key, value1: data1[key], value2: data2[key],
      };
    }
    return { type: 'unchanged', key, value: data1[key] };
  });
};

const getDiff = (filepath1, filepath2) => {
  const data1 = getNormalizedData(filepath1);
  const data2 = getNormalizedData(filepath2);

  return buildTree(data1, data2);
};

export default getDiff;
