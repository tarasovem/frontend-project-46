import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);
const expectedResult = readFileSync(getFixturePath('expected-result.txt'), 'utf-8');

console.log(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')));

console.log(expectedResult);

test('Сравнение плоских json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedResult);
});
