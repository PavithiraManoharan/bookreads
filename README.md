# MyReads Project

## Goal and Description
The goal of this project is to build an application with React. The application consists of a main page where three bookshelves are displayed namely - currently reading, want to read and read. The MyReads App has a search function where books can be searched with the help of keywords and be added in the bookshelf of the user's choice. The application has been developed with ES6 code. The major fundamentals of React have been learnt and used in this project, like:
- Rendering UI with Components
- State Management
- Accessing data from external APIs
- using the React Router for URL Navigation

## Installation
In order to run this app in a local machine, the following steps need to be followed:
1. Run the command `npm install` (assuming node and npm are already installed in the local machine) to install local dependencies of the project
2. Run the command `npm start` in order to compile and launch the application. If the app does not start automatically, goto the Web Browser and enter the URL 'http://localhost:3000' to access the app

## Application Usage and testing
- The app is displayed with an initial number of books in the three shelves. The books can be moved to other shelves using the arrow button next to the book icon
- At the bottom of the main page is a '+' icon that allows you to search for and add a book to one of the shelves.
- In the search page, books can be searched using a selected list of keywords found at [Keywords for MyReads](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md)
- If there are 4 or more letters typed in the search box, a list of books is displayed if the search string matches the books' title or author. From the list, using the same down arrow button the book can be added in one of three shelves - currently Reading, want to read, read.
- A page refresh will not remove books from the shelves, but a cache delete will, because the books are temporarily stored on the user's cache memory.

