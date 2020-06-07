# CASE frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment Variables

Please refer to the below sample env variables:

REACT_APP_BACKEND_URL=http://localhost:5000/

## Available Scripts

In the project directory, you can run :

### `npm start`

Runs project in development mode

### Integration with Homepage

1. In src/data/HomePageData.js, add the relative path to the respective button.

E.g. to add path to the "Create New Category" button in the CATEGORY card under "Quiz Master" tab:

{
role: "QM",
cards: [
{
title: "CATEGORY",
buttons: [
{ title: "Create New Category", path: "/category/add" },
{ title: "Edit Existing Category", path: "" },
],
},

2. Add the protected path to src/components/Router.js.
