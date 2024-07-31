# Music App Client

This is the MusicApp client, designed to interact with the server and provide a rich user experience for music reviews. It includes a range of features for browsing, submitting, and managing music reviews, as well as exploring albums provided by the Spotify WebAPI.

## Getting Started

Follow the instructions below to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (version 16.x or higher)
- Yarn or npm installed

### Installation

To install this project, follow these steps:

1. Clone the project:
```
git clone git@github.com:juhokan/music-app.git
```
2. Navigate to the client directory:
```
cd music-app/client
```
3. Install the dependencies:
```
yarn install # yarn
```
```
npm install # npm
```

### Usage
To run this project, use the following command:
```
yarn dev # yarn
```
```
npm run dev # npm
```

### Environment Setup

To run this project, you will need to add the following environment variables to your `.env` file:

```
VITE_CLIENT_ID=your_spotify_client_id
VITE_CLIENT_SECRET=your_spotify_client_secret
```

Replace ```your_spotify_client_id``` and ```your_spotify_client_secret``` with your actual Spotify API credentials.

Additionally, if your server is running somewhere else other than `localhost:3003`, add
```
VITE_SERVER_URL=your_server_url
```
to your `.env` file.

### Connecting to Spotify API

This project uses the Spotify API to fetch data. To connect to the API, follow these steps:

1. Create a Spotify Developer account and register your application.
2. Add the ```VITE_CLIENT_ID``` and ```VITE_CLIENT_SECRET``` to your ```.env``` file.
3. Add your application callback url `http://localhost:5173` and `http://localhost:5173/callback` to your application in the spotify developer application. 

    > **NOTE**: If your application is running on another port, remember to add `VITE_CALLBACK_URL` to your `.env` file

4. Use the provided credentials to authenticate and obtain an access token from Spotify.
5. Use the access token to make requests to the Spotify API.

For more information on using the Spotify API, refer to the [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api).
