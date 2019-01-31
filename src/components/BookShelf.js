import React, { Fragment } from 'react';
import Book from './Book'


const BookShelf = ({ books, updateShelf }) => {

    const shelves = [
        {
            key: 'currentlyReading',
            title: 'Currently Reading'
        },
        {
            key: 'wantToRead',
            title: 'Want to Read'
        },
        {
            key: 'read',
            title: 'Read'
        }
    ];


    return (
        <Fragment>
            {
                shelves.map((shelf) => {

                    const booksInShelf = books.filter(book => book.shelf === shelf.key);

                    return (
                        <div className="bookshelf" key={shelf.key}>
                            <h2 className="bookshelf-title">{shelf.title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        booksInShelf.map(book => (
                                            <Book key={book.id}
                                                  book={book}
                                                  updateShelf={updateShelf}
                                            />
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>)//return    
                })
            }
        </Fragment>
    );
}
export default BookShelf