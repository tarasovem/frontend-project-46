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

test-coverage:
	npm test -- --coverage --coverageProvider=v8

check: lint test
