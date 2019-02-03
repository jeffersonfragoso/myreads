import React from 'react'

const Book = ({ book, updateShelf }) => {

    let onChangeShelf = event => {
        updateShelf(book, event.target.value)
    }

    return (
            <li>
                <div key={book.id} className="book">
                    <div className="book-top">
                        <div className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${(book.imageLinks) && (book.imageLinks.thumbnail)})`
                            }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select onChange={onChangeShelf} defaultValue={book.shelf ? book.shelf : 'none'}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{(book.authors) && (book.authors)}</div>
                </div>
            </li>
    )
}

export default Book 