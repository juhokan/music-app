![banner](https://github.com/user-attachments/assets/3ef77369-8442-4b22-9820-6c64b3c4be3f)

## Table of Contents
1. Introduction
2. Getting Started
3. Time Tracking
4. Client task list
5. Server task list
6. Features

## Introduction
Music App is a full stack web application built for the Full Stack Open course as a course project. The client is built with Vite and TypeScript, and the server is built with Node.js using MongoDB. The client uses the Spotify API to fetch album data. To use the application, you need to have a Spotify account.

## Getting Started

To get started with the development of this project, please refer to the following documentation:

- **[Client Repository](https://github.com/juhokan/music-app/tree/main/client)**: Includes instructions for setting up and running the client-side application and connecting to the Spotify WebAPI
- **[Server Repository](https://github.com/juhokan/music-app/tree/main/server)**: Contains guidelines for setting up and running the server-side application and connecting to MongoDB.

## Time Tracking
This project builds upon a previous project located in the `music-review-app` repository. The previous project was similar in structure but used Strapi as a CMS. A lot of the basic structure of this project was figured out and created for music-review-app. Daily time tracking for both projects can be found [here](https://github.com/juhokan/music-app/blob/main/documentation/times.md).


### Total Time Spent
| Project    | Total (hours) |
|------------|----------------|
| Previous project (music-review-app) | 80             |
| Current Project (music-app)  | 98              |
| Total           | 178             |

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
- [x] UI styling
- [x] CI/CD Pipeline for tests and deployment
- [x] Build and development containerization
- [x] Add metadata
- [x] Change review score
- [x] Implement user page
- [x] Filter reviews and check statistics
- [x] Fetch users Spotify-albums
- [x] Add favourites and show users favourites

## Server Task List
- [x] Set up project structure
- [x] Initialize server with Node.js
- [x] Setup ESLint
- [x] Implement server-side routing
- [x] Connect client and server
- [x] Create user and album schema
- [x] Parse user and album data
- [x] Create tests for users and albums
- [x] CI/CD Pipeline for tests and deployment

## Features

- Fetch albums with Spotify WebAPI
- Rate albums (1-10) and add listeded albums
- Listen to track previews
- Add album to Favourites
- Fetch Spotify's new releases
- See all ratings and sort them
- Fetch users saved Spotify albums
- See own rating statistics


### Example Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/aa9bf17f-df98-40f8-b1ee-607844d20cb0" alt="Homepage" />
  <br />
  <em>Homepage: View the main interface where you can browse recent ratings and new releases</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/3d499192-5047-4ad7-8ede-f223390ef406" alt="Rating" />
  <br />
  <em>Album page: Rate albums on a scale from 1 to 10, see info on the album and listen to the track previews.</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ff395238-2684-4272-91ba-125a0c0b2a83" alt="Profile" />
  <br />
  <em>Profile page: View and manage your ratings, favourites, saved albums and personal statistics.</em>
</p>
