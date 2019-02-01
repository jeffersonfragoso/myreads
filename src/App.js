import React, { Fragment } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BookList from './components/BookList'
import BookSearch from './components/BookSearch';


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  updateShelf = (book, shelfName) => {
    
    const bookFromState = this.state.books.find(b => b.id === book.id);
    if (bookFromState) {
      bookFromState.shelf = shelfName;
      BooksAPI.update(book, shelfName)
        .then(this.setState(currentState => ({
          books: currentState.books
        })))
    } else {
      book.shelf = shelfName;
      BooksAPI.update(book, shelfName)
        .then(this.setState(prevState => ({
          books: prevState.books.concat(book)
        })))
    }
  };


  render() {

    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Fragment>
            <BookList books={books} updateShelf={this.updateShelf} />
            <Link to="/BookSearch" className="open-search">Add a book</Link>
          </Fragment>
        )} />

        <Route exact path="/BookSearch" render={() => (
          <BookSearch />
        )} />
      </div>
    )
  }
}

export default BooksApp
