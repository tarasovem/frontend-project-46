install:
	npm ci

publish:
	npm publish --dry-run

setup: install publish

gendiff:
	node bin/gendiff.js --help