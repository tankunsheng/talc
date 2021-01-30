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

