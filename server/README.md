# Music App Server

This is the server for the Music App, providing API endpoints for the music reviewing functionalities.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js (version 16.x or higher)
- npm or Yarn

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repo:
   ```
   git clone git@github.com:juhokan/music-app.git
   ```
2. Navigate to the server directory:
   ```
   cd music-app/server
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the server

To start the server in development mode, run the following command:

```
npm run dev
```
To start the build version, run:
```
npm run build && npm start
```

### Environment Setup

To run this project, you will need to add the following environment variables to your ```.env``` file:

```
PORT=your_preferred_port
SECRET=your_secret
```

Replace ```your_preferred_port``` and ```your_secret``` with the actual values.

> **Note**: By default, the client uses port 3003 for the server

### MongoDB Setup

This project uses MongoDB as its database. Follow these steps to connect your application to MongoDB:

1. Install MongoDB on your local machine or set up a MongoDB database on a cloud provider.
2. Add the following environment variables to your ```.env``` file to configure the database connection:

   ```
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   MONGODB_URI=your_mongodb_uri
   TEST_MONGODB_URI=your_test_mongodb_uri
   ```

Replace ```your_db_username```, ```your_db_password```, ```your_mongodb_uri```, and ```your_test_mongodb_uri``` with the actual values provided by your MongoDB setup.
