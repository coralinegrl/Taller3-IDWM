# Taller 3 MobileHub


## Taller 3 API

This project is an API built with Express and uses Firebase as its database.

## Technologies Used

- Nodejs (18.xx)
- Express
- Firebase
- Git

## Setup

To run this project, you will need to follow these steps:

1. You must use the branch called `master`.
2. Clone the repository.
3. Open a terminal, and type `cd api`
4. Install the dependencies using `npm install`.
5. Set up Firebase in your project:
   - Go to [Firebase](https://firebase.google.com)
   - Click on the "Get started" button
   - Create a new project and follow the steps provided by the page
   - Once the project is created, go to Settings > Project Configuration > Service Accounts
   - At the bottom of the page, click on "Generate new private key", then "Generate"
   - This will download a JSON file. Copy the contents of this file
   - Paste the copied contents into a new file in the `api/firebase/` directory of your project, where the `credentials.example.json` file is located
   - Rename this new file to `credentials.json`
6. Set up your Firebase and get the URL.
7. Create a `.env` file in the root directory of your project and add the following environment variables (you can copy from the .env.example file):

```properties
PORT=Your_Port_Number
JWT_SECRET_KEY=Your_JWT_Secret_Key 
VUE_APP_GITHUB_ACCESS_TOKEN=Your_Github_Token
```
8. Run the app using the command `npm run dev`.


## Taller 3 front

This project is an frontend built with Vue framework and Ionic.

## Technologies Used

- Nodejs (18.xx)
- Vue
- Ionic
- Git

## Setup

1. Open a terminal, and type `cd front`
2. Install the dependencies using `npm install`.
```
npm install
```
3. Run the app using the command `npm run serve`.


# POSTMAN

To test the api using "postman-file", you need to install Postman. When you open Postman and choose a workspace, you must click on "Import" and select "taller3.postman-collection".
