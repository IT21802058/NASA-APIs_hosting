[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/V1F4A3D5)

# NASA-APIs_SKOM_AS2

NASA-APIs_SKOM_AS2 is a React application developed with a strong emphasis on functional components. It integrates and utilizes data effectively from NASA's APIs, enhances usability through the Tailwind CSS framework, and manages user sessions effectively using cookies. The application is deployed on (backend on render and frontend on vercel).

## Table of Contents

- [Setup](#setup)
- [Build](#build)
- [Run](#run)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:

   git clone https://github.com/<<your-username>>/<<Reponame>>.git ("https://github.com/sliitcsse/se3040-assignment02-IT21802058.git")
   

2. Navigate to the project backend directory:

   cd BACKEND
   

3. Install dependencies:

   npm install


4. create .env file on root directory in backend
    insert,
    MONGODB_URL=<<your mongodb url>>
    ACCESS_TOKEN_SECRET=<<Access token key>>
    REFRESH_TOKEN_SECRET=<<Refresh token key>>
    PORT=<<port number>>


5. Navigate to the project frontend directory:
   
   cd frontend


6. Install dependencies:

   npm install

7. create .env file on root directory in frontend
    insert,
    VITE_API_KEY=<<your nasa api key>>



## Build

To build the project for production, run:

npm run build


This will create a production-ready build in the dist directory.

## Run

To run the project in development mode, use:

npm run dev

in both BACKEND and frontend directories
This will start the development server and then after ru fontend open the application in your default web browser.

## Testing

To perform backend testing in the application, use:

npm test


This will run all the tests using Jest in backend.

## Deployment

The application is deployed on (https://nasa-ap-is-hosting.vercel.app/).
