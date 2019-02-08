import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce'
import Book from './Book'
import NoResults from './NoResults'

class BookSearch extends Component {

    state = {
        termsToSearch: "",
        results: []
    }

    resultsQuery = debounce((terms) => {
        
        this.setState({ termsToSearch: terms })

        if (terms.length) {
            BooksAPI.search(terms).then(books => {
                if (books.length) {
                    this.booksInShelvs(books)
                    this.setState({ results: books})
                } else {
                    this.setState({ results: [] })
                }
            })
        }
    }, 500)

    getEvent = (evento) => {
        this.resultsQuery(evento.target.value)
    }

    booksInShelvs = (results) => {
        results.filter(result => this.props.books.find(book => {
            (result.id === book.id) && (result.shelf = book.shelf)
        }))
    }

    render() {

        const { termsToSearch, results } = this.state
        const { updateShelf } = this.props

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
                                ((results.length > 0) && (termsToSearch !== "")) ?
                                    (results.map(book => (
                                        <Book key={book.id}
                                            book={book}
                                            updateShelf={updateShelf}
                                        />))) :
                                    <NoResults terms={termsToSearch} />
                            }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
};

export default BookSearch;