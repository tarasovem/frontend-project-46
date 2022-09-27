import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);
const expectedResult = readFileSync(getFixturePath('expected-result.txt'), 'utf-8');

describe('Сопоставление плоских данных в', () => {
  it('JSON-файлах', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedResult);
  });
  it('YAML-файлах', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expectedResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toBe(expectedResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'))).toBe(expectedResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'))).toBe(expectedResult);
  });
});
