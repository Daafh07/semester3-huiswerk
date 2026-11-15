# Library app (MVC)

A React app built with the Model-View-Controller pattern.

## Structure

- `src/models/BoekModel.js`: the starting data and the lending rule. The model does not use React and never changes existing book objects.
- `src/views/BibliotheekView.jsx`: shows the books and passes a click on the borrow button to the controller through `onLeenBoek`.
- `src/views/BibliotheekView.css`: the styling of the view.
- `src/controllers/BibliotheekController.jsx`: keeps the current books in React state, handles user actions through the model and passes the data to the view.
- `src/main.jsx`: starts the app with the controller.

When you borrow a book, the view passes the book ID to the controller. The controller asks the model for the new list of books and updates the state, and React shows the updated view. A book that is already borrowed cannot be borrowed again.

The books are kept in memory, so after a reload the app starts again with the starting data.

## Getting started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
