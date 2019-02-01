import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import BookList from './components/BookList'
import BookSearch from './components/BookSearch';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
      // update existing
      bookFromState.shelf = shelfName;
      BooksAPI.update(book, shelfName)
        .then(this.setState(currentState => ({
          books: currentState.books
        })))
    } else {
      // add new one
      book.shelf = shelfName;
      BooksAPI.update(book, shelfName)
        .then(this.setState(prevState => ({
          books: prevState.books.concat(book)
        })))
    }
  };


  render() {

    const { books, showSearchPage } = this.state

    return (
      <div className="app">
        {showSearchPage || (
          <>
            <BookList books={books} updateShelf={this.updateShelf} />
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </>
        )}
        {showSearchPage && (
          <BookSearch closeSearchPage={() => this.setState({ showSearchPage: false })}/>
        )}
      </div>
    )
  }
}

export default BooksApp
