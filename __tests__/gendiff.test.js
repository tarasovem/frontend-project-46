import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);
const expectedResult = readFileSync(getFixturePath('expected-result.txt'), 'utf-8');

test('Сравнение плоских JSON-файлов', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedResult);
});
