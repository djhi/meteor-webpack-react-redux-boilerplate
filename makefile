.PHONY: met test

copy-conf:
	cp --no-clobber ./settings/development/settings-dist.json ./settings/development/settings.json
	cp --no-clobber ./settings/production/settings-dist.json ./settings/production/settings.json
	cp --no-clobber ./settings/staging/settings-dist.json ./settings/staging/settings.json

	cp --no-clobber ./settings/production/mup-dist.json ./settings/production/mup.json
	cp --no-clobber ./settings/staging/mup-dist.json ./settings/staging/mup.json

make install: copy-conf
	npm install

mongo:
	cd meteor_core && meteor mongo

run-dev:
	NODE_ENV=development node ./scripts/development.js

run-debug:
	NODE_ENV=development node ./scripts/debug.js

run-prod:
	NODE_ENV=production node ./scripts/production.js

deploy-staging:
	NODE_ENV=staging node ./scripts/deploy.js mup

deploy-prod:
	NODE_ENV=production node ./scripts/deploy.js mup

restart-staging:
	cd ./settings/staging && mup restart

restart-prod:
	cd ./settings/production && mup restart

test:
	NODE_ENV=test ./node_modules/karma/bin/karma start && ./node_modules/karma/bin/karma-run
