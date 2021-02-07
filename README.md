# TALC Monolith application that consists of front and back ends in one project

## Start Local Development

```bash
# install dependencies
npm install

# run nest to serve back end and webpack-dev-server to serve frontend concurrently
npm start

```
* Frontend served from http://localhost:3010/
* Backend served from http://localhost:3000

---
## Build Production and Run
```bash
# install dependencies
npm install

# run nest build to build backend and webpack to build frontend into 'dist' dir
npm run build

# run production
npm run start:prod

```
* Frontend and Backend both served from :3000

---
## TYPEORM Migrations
```bash

# show migrations that have not been ran
npm run typeorm migration:show
# generate all changes made into entities file into a migration script
npm run typeorm migration:generate -- -n {scriptname}
# run all pending migrations
npm run typeorm migration:run
# revert the most recently executed migration
npm run typeorm migration:migration:revert
# refer to https://typeorm.io/#/using-cli/installing-cli for more typeorm cli docs
```
references: 
* https://docs.nestjs.com/techniques/database#migrations
* https://typeorm.io/#/migrations
* https://typeorm.io/#/using-ormconfig/using-ormconfigjs

