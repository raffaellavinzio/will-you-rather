# Would You Rather Project

The is the final assessment project for Udacity's React & Redux course.

The application has a simple way to log in and log out where the user can select a name from the list of existing users.
The answered and unanswered polls are both available at the root. A polling question links to details of that poll at `questions/:question_id`

Upon voting in a poll, all of the information of the answered poll is displayed.

Users can add new polls and the form is available at `/add` and there is a leaderboard available at `/leaderboard` where users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The application requires only `npm install` and `npm start` to install and launch.
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### fake database

The _DATA.js file represents a fake database and methods that let you access the data. Details are described [here](https://github.com/udacity/reactnd-project-would-you-rather-starter/blob/master/README.md)


