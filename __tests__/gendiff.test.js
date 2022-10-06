import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);
const stylishResult = readFileSync(getFixturePath('./expected-result/stylish.txt'), 'utf-8');
const plainResult = readFileSync(getFixturePath('./expected-result/plain.txt'), 'utf-8');
const jsonResult = readFileSync(getFixturePath('./expected-result/json.txt'), 'utf-8');

describe('Сопоставление данных в', () => {
  it('JSON-файлах, форматирование stylish', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(stylishResult);
  });
  it('JSON-файлах, форматирование plain', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(plainResult);
  });
  it('JSON-файлах, форматирование json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(jsonResult);
  });
  it('YAML-файлах, форматирование stylish', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(stylishResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(stylishResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(stylishResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish')).toEqual(stylishResult);
  });
  it('YAML-файлах, форматирование plain', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(plainResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(plainResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain')).toEqual(plainResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain')).toEqual(plainResult);
  });
  it('YAML-файлах, форматирование json', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(jsonResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(jsonResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'json')).toEqual(jsonResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json')).toEqual(jsonResult);
  });
});
