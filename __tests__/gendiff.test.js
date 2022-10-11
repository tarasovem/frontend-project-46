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

test.each`
  file1           | file2           | ext1 | ext2
  ${'file1.yml'}  | ${'file2.yml'}  | ${'yml'}  | ${'yml'}
  ${'file1.yaml'} | ${'file2.yaml'} | ${'yaml'} | ${'yaml'}
  ${'file1.yml'}  | ${'file2.yaml'} | ${'yml'}  | ${'yaml'}
  ${'file1.yaml'} | ${'file2.yml'}  | ${'yaml'} | ${'yml'}
`('YAML-файлы, вывод - stylish, ($ext1 + $ext2)', ({ file1, file2 }) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'stylish')).toEqual(stylishResult);
});

test.each`
  file1           | file2           | ext1      | ext2
  ${'file1.yml'}  | ${'file2.yml'}  | ${'yml'}  | ${'yml'}
  ${'file1.yaml'} | ${'file2.yaml'} | ${'yaml'} | ${'yaml'}
  ${'file1.yml'}  | ${'file2.yaml'} | ${'yml'}  | ${'yaml'}
  ${'file1.yaml'} | ${'file2.yml'}  | ${'yaml'} | ${'yml'}
`('YAML-файлы, вывод - plain, ($ext1 + $ext2)', ({ file1, file2 }) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'plain')).toEqual(plainResult);
});

test.each`
  file1           | file2           | ext1      | ext2
  ${'file1.yml'}  | ${'file2.yml'}  | ${'yml'}  | ${'yml'}
  ${'file1.yaml'} | ${'file2.yaml'} | ${'yaml'} | ${'yaml'}
  ${'file1.yml'}  | ${'file2.yaml'} | ${'yml'}  | ${'yaml'}
  ${'file1.yaml'} | ${'file2.yml'}  | ${'yaml'} | ${'yml'}
`('YAML-файлы, вывод - json, ($ext1 + $ext2)', ({ file1, file2 }) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'json')).toEqual(jsonResult);
});

test.each`
  file1           | file2         | ext1      | ext2    | formatter
  ${'file1.txt'}  | ${'file2.md'} | ${'txt'}  | ${'md'} | ${'stylish'}
  ${'file1.json'} | ${'file2.md'} | ${'json'} | ${'md'} | ${'plain'}
  ${'file1.txt'}  | ${'file2.md'} | ${'txt'}  | ${'md'} | ${'json'}
`('Ошибка неподдерживаемого расширения, ($ext1 + $ext2)', ({ file1, file2, formatter }) => {
  expect(() => {
    genDiff(getFixturePath(file1), getFixturePath(file2), formatter);
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
