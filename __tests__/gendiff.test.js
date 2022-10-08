import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';
import getStylishFormatted from '../src/formatters/stylish.js';
import getPlainFormatted from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);
const stylishResult = readFileSync(getFixturePath('./expected-result/stylish.txt'), 'utf-8');
const plainResult = readFileSync(getFixturePath('./expected-result/plain.txt'), 'utf-8');
const jsonResult = readFileSync(getFixturePath('./expected-result/json.txt'), 'utf-8');
const incorrectDiffTree = [
  {
    type: 'nested',
    key: 'common',
    value: [
      {
        type: 'multiplied',
        key: 'foo',
        value: 'bar',
      },
    ],
  },
  {
    type: 'removed',
    key: 'abc',
    value: 12345,
  },
];

test('JSON-файлы, вывод - stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(stylishResult);
});

test('JSON-файлы, вывод - plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(plainResult);
});

test('JSON-файлы, вывод - json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(jsonResult);
});

test('YAML-файлы, вывод - stylish', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(stylishResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(stylishResult);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(stylishResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish')).toEqual(stylishResult);
});

test('YAML-файлы, вывод - plain', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(plainResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(plainResult);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain')).toEqual(plainResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain')).toEqual(plainResult);
});

test('YAML-файлы, вывод - json', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(jsonResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(jsonResult);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'json')).toEqual(jsonResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json')).toEqual(jsonResult);
});

test('Ошибка неподдерживаемого расширения', () => {
  expect(() => {
    genDiff(getFixturePath('file1.txt'), getFixturePath('file2.md'), 'stylish');
  }).toThrow();
  expect(() => {
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.md'), 'plain');
  }).toThrow();
  expect(() => {
    genDiff(getFixturePath('file1.txt'), getFixturePath('file2.md'), 'json');
  }).toThrow();
});

test('Ошибка неподдерживаемого формата вывода', () => {
  expect(() => {
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'yaml');
  }).toThrow();
});

test('Неправильное дерево отличий', () => {
  expect(() => {
    getStylishFormatted(incorrectDiffTree);
  }).toThrow();
  expect(() => {
    getPlainFormatted(incorrectDiffTree);
  }).toThrow();
});
