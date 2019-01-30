import React from 'react';

const BookShelf = ({ books }) => {

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
        <div>
            {shelves.map((shelf) => {
                const bookInShelf = books.filter(book => book.shelf === shelf.key);
                    return (
                        <div className="bookshelf" key={shelf.key}>
                            <h2 className="bookshelf-title">{shelf.title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {bookInShelf.map((book) => (
                                        <li key={book.id} book={book}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover"
                                                        style={{
                                                            width: 128,
                                                            height: 193,
                                                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                        }}>
                                                    </div>
                                                    <div className="book-shelf-changer">
                                                        <select>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>)//map return    
                })
            }
        </div>
    );
}
export default BookShelf