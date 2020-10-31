# OUTLOOK CLONE

It's developed using React (Typescript). You can have a [quick look here!](https://chandrahaswtw.github.io/outlook-clone/)

### PACKAGES USED
- **mobx** and **mobx-react-lite** for state management.
- **react-fontawesome** library for icons.
- **node-sass** as CSS Precompiler.
- None other extra packages were used apart from these.

### The app resembles the Microsoft outlook with the following features:

- The email client can have multiple mail folders
- We assume the following mail folders to be present:
    - Inbox
    - Spam
    - Deleted Items
    - Custom Folder
- The starting data of this application can be assumed to come from a JSON file. As an example, we have 2 JSON files in Asssets folder.
    - inbox.json
    - spam.json
- Each of the element in the JSON file represents a mail
    - **subject**: The mail subject which is a string
    - **content**: The mail content which is a string and can contain html.
    - **mId**: The mail Id of this mail which can be assumed to be unique Guid string
    - **unread**: boolean
- The client should have the following features:
    - When the app starts, the app loads the contents of each folder and displays the unread counts. 
    - User can move around within the app to Inbox, Spam and Custom Folder.
    - User can select any mail and look into the contents.
    - User can see a brief preview before clicking on it.
    - User can delete a message. In which case it should come in deleted items.
    - User can flag a message.
    - User can filter on inbox on whether a message is flagged or not. 
    - State, navigation are saved between refreshes.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
