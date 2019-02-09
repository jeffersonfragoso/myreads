import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce'
import Loader from './Loader'
import Book from './Book'
import NoResults from './NoResults'

class BookSearch extends Component {

    state = {
        termsToSearch: "",
        results: [],
        loader: false
    }

    //
    resultsQuery = debounce(async (terms) => {

        this.setState({ termsToSearch: terms, results: [], loader: true })

        if (terms.length) {
            const booksFound = await BooksAPI.search(terms)
            if (booksFound.length) {
                this.booksInShelvs(booksFound)
                this.setState({ results: booksFound, loader: false })
            } else {
                this.setState({ results: [], loader: false })
            }
        }
    }, 700)
   

    //
    getEvent = (evento) => {
        this.resultsQuery(evento.target.value)
    }

    //
    booksInShelvs = (results) => {
        results.filter(result => this.props.books.find(book => {
            (result.id === book.id) && (result.shelf = book.shelf)
        }))
    }


    render() {

        const { termsToSearch, results, loader } = this.state
        const { updateShelf } = this.props

        const resultsShow = (results.length > 0) && (termsToSearch !== "")
        const loaderShow = (loader) && (termsToSearch.length)

        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/" />
                        <div className="search-books-input-wrapper">
                            <input type="text"
                                placeholder="Search by title or author"
                                onChange={this.getEvent}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {
                                loaderShow
                                    ? <Loader />
                                    : resultsShow
                                        ? results.map(book => (
                                            <Book key={book.id}
                                                book={book}
                                                updateShelf={updateShelf}
                                            />)) 
                                        : <NoResults terms={termsToSearch} />
                            }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
};

export default BookSearch;