import getFormatDiff from './formatters/index.js';
import getDiff from './getDiff.js';

const genDiff = (filepath1, filepath2, formatter) => {
  const diff = getDiff(filepath1, filepath2);
  return getFormatDiff(diff, formatter);
};

export default genDiff;
