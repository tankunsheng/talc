# TALC Monolith application that consists of front and back ends in one project

## Start Local Development
Prepare a .env file at the root dir with the following variables

```ini
DYNAMODB_SESSIONS_ACCESS_KEY_ID=
DYNAMODB_SESSIONS_SECRET_ACCESS_KEY=
COGNITO_USERPOOL_ID=
COGNITO_USERPOOL_APP_ID=
API_URL=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
TYPEORM_CONFIG_ENTITIES=src/**/*.entity{.ts,.js}
```
then
```bash
# install dependencies
npm install

# concurrently runs 2 processes in one shell
# runs 
# 1. nest to serve back end and
# 2. webpack-dev-server to serve frontend 
npm start

```
* Frontend served from http://localhost:3010/
* Backend served from http://localhost:3000

---
## Build and Run
This project serves both frontend static files and backend from the same nest process

### Non-Container
```bash
# install dependencies
npm install

# run nest build to build backend and webpack to build frontend into 'dist' dir
npm run build

# run production
npm run start:prod

```
Docker 
```bash
# in root project where dockerfile is
docker build .
```
## Deployment
TALC is continuously integrated and deployed via GitlabCI to AWS ECS.
Refer to .gitlab-ci.yml for more details

* Frontend and Backend both served from :3000

---
## TYPEORM Migrations

TALC uses typeorm for object relational mapping along with database schema migrations

```bash
# show migrations that have not been ran
npm run typeorm migration:show
# generate all changes made into entities file into a migration script
npm run typeorm migration:generate -- -n {scriptname}
# run all pending migrations
npm run typeorm migration:run
# revert the most recently executed migration
npm run typeorm migration:revert
# refer to https://typeorm.io/#/using-cli/installing-cli for more typeorm cli docs
```

---
## Cypress
<!-- https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress -->
how to get Cypress to run in WSL2

references: 
* https://docs.nestjs.com/techniques/database#migrations
* https://typeorm.io/#/migrations
* https://typeorm.io/#/using-ormconfig/using-ormconfigjs

