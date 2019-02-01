import React, { Component } from 'react';
import BookShelf from './BookShelf'


class BookList extends Component {
    render() {

        const { books, updateShelf } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf books={books} updateShelf={updateShelf} />
                </div>
            </div>
        );
    }
}

export default BookList;