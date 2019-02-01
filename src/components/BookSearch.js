import React from 'react';
import { Link } from 'react-router-dom'

const BookSearch = ({closeSearchPage}) => {
    return (
        <div>
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" />
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
            </div>
        </div>
    );
};

export default BookSearch;