# Music App

## Table of Contents
1. Introduction
2. Project Structure
3. Time Tracking
4. License

## Introduction
Music app is a full stack web application built for the Full Stack Open course as a course project. The client is built with Vite and TypeScript, and the server is built with Node.js using MongoDB as the database.

## Project Structure
```
 ├ .git
 ├ .gitignore
 ├ LICENSE
 ├ README.md
 ├ client
 │  ├ .env
 │  ├ .eslintrc.cjs
 │  ├ .gitignore
 │  ├ README.md
 │  ├ index.html
 │  ├ node_modules
 │  ├ package-lock.json
 │  ├ package.json
 │  ├ public
 │  │  ├ vite.svg
 │  ├ src
 │  │  ├ App.css
 │  │  ├ App.tsx
 │  │  ├ assets
 │  │  ├ components
 │  │  ├ config.ts
 │  │  ├ context.ts
 │  │  ├ index.css
 │  │  ├ interface
 │  │  ├ main.tsx
 │  │  ├ routes.ts
 │  │  ├ services
 │  │  ├ utils
 │  │  ├ vite-env.d.ts
 │  ├ tsconfig.app.json
 │  ├ tsconfig.json
 │  ├ tsconfig.node.json
 │  ├ vite.config.ts
 ├ server
 │  ├ .editorconfig
 │  ├ .env
 │  ├ .eslintignore
 │  ├ .eslintrc.json
 │  ├ .prettierrc.js
 │  ├ dist
 │  │  ├ src
 │  ├ node_modules
 │  ├ package-lock.json
 │  ├ package.json
 │  ├ src
 │  │  ├ app.ts
 │  │  ├ controllers
 │  │  ├ index.ts
 │  │  ├ models
 │  │  ├ tests
 │  │  ├ types.ts
 │  │  ├ utils
 │  └ tsconfig.json
```

## Time Tracking
This project builds upon a previous project located in the `music-review-app` repository. The previous project was similar in structure but used Strapi as a CMS. 

### Previous Project (music-review-app)
| Date       | Client (hours) | Server (hours) |
|------------|----------------|----------------|
| total      | 40             | 5              |

### Current Project
| Date       | Client (hours) | Server (hours) |
|------------|----------------|----------------|
| total      | 5              | 3              |

### Total Time Spent
| Project    | Client (hours) | Server (hours) |
|------------|----------------|----------------|
| music-review-app | 10             | 5              |
| Current Project  | 9              | 9              |
| Total           | 19             | 14             |

## Client Task List
- [x] Set up project structure
- [x] Initialize client with Vite & TypeScript
- [x] Setup ESLint 
- [x] Implement client-side routing
- [x] Connect client and server
- [x] Connect client to Spotify
- [x] Fetch albums from server
- [x] Fetch albums from Spotify
- [x] Add a new review
- [x] Delete existing review
- [ ] UI styling
- [ ] Change review score
- [ ] Implement user page
- [ ] Fetch users Spotify-albums
- [ ] Fetch users up-next albums
- [ ] Filter reviews and check statistics
- [ ] Add friends

## Server Task List
- [x] Set up project structure
- [x] Initialize server with Node.js
- [x] Setup ESLint
- [x] Implement server-side routing
- [x] Connect client and server
- [x] Create user and album schema
- [x] Parse user and album data
- [x] Create tests for users and albums
- [ ] Create Up-Next albums
- [ ] Add friends for user
