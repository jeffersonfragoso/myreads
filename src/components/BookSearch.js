import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookSearch extends Component {

    state = {
        query: "",
        results: []
    }


    resultsQuery = (e) => {

        const query = e.target.value

        this.setState(() => ({ query }))

        BooksAPI.search(query).then(books => {
            if (books) {
                  this.setState({ results: books })
            } else {
                  this.setState({ results: [] })
            }
        })

    }

    render() {

        const { query, results } = this.state
        const { updateShelf } = this.props

        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/" />
                        <div className="search-books-input-wrapper">
                            <input type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={this.resultsQuery}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {results.length > 0 ? (results.map((book) => (
                                <Book key={book.id}
                                    book={book}
                                    updateShelf={updateShelf}
                                />
                            ))) : (<p></p>)
                            }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
};

export default BookSearch;