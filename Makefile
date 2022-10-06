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
