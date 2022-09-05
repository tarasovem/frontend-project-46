const { Command } = require('commander');
const program = new Command();
const { readFileSync } = require('node:fs');
const _ = require('lodash');

const genDiff = (filepath1, filepath2) => {
  const getParsedData = (filepath) => {
    const serializedData = readFileSync(filepath, 'utf-8');
    return JSON.parse(serializedData);
  };

  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const result = {};
  const entries = Object.entries(data1);

  for (let [ key, value ] of entries) {
    if (_.has(data2, key) && data2[key] !== data1[key]) {
      result[`- ${key}`] = data1[key];
      result[`+ ${key}`] = data2[key];
    } else if (!_.has(data1, key)) {
      result[`+ ${key}`] = value
    } else if (_.has(data2, key) && data2[key] === data1[key]) {
      result[`  ${key}`] = value;
    } else {
      result[`- ${key}`] = data1[key];
    }
  }

   return result;
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filename1, filename2) => {
    console.log(genDiff(filename1, filename2))
  });

program.parse();
