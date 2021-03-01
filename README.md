# How to run the code

For this you need to have Node installed and run the following command - "npm install".
After that you need to run the next command - "npm start".
And that's it!

---

# Explanation of architecture

My project is built with Create React App.

I used function components in it.
I took all movies from provided JSON file and save them on the Firebase for better interactions with them. Comments for movies are stored in movies documents in arrays (not very good, subcollections are better, but for current project it is OK).

## In my project I have different folders among which:
* "components" which contains components themselves and their styles (SASS files). Index files are needed for more convenient importing those components.

* "services" for different services like HTTP for fetching data or possible CRUD operations on it.

* "utils" for common and specific operations or actions which different components need. Because otherwise components files would be too big. 

## Libraries that I used:
* react - the backbone of my project
* @ant-design/icons - icons for better UX
* antd - for using built components
* axios - for fetching data
* firebase - for storing and manipulating data 
* lodash-es - a set of usefull functions
* moment - for working with dates
* moment-duration-format - help moments work with durations
* node-sass - it is not a library but a loader for using SASS in the ptojects.

---

# If you had more time, what would you like to improve?

I would:

## UI/UX
* make my project look good on mobile devices.
* add some animations to an arrow for closing a modal and to new comments to make them appear more smoothly.
* make notifications much prettier (Could use react-toastify, but Ant design quite a big library).
* replace added comment after it came from DB (with id) or remove it from state, if an error occurred during saving it on the server

## Data structure
* store comments as a subcollections of movies documents or even put them in a separate collection (because I do not always need to load all the comments of all time).
* add genres to a separate entity in the database.
* add a timestamp to comments.

## General
* Optimize the bundle of Ant Design by adding "babel-plugin-import" into webpack. But for this I need to run "eject" command and project will become quite messy.
