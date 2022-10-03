install:
	npm ci

publish:
	npm publish --dry-run

setup: install publish

gendiff:
	node bin/gendiff.js --help

lint:
	npx eslint .

test:
	npm test

check: lint test

start:
	node bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json -f plain