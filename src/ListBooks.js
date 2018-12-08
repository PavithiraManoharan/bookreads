import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {

    shelves = [
        {
            id: 'currentlyReading',
            title: 'Currently Reading'
        },
        {
            id: 'wantToRead',
            title: 'Want to Read'
        },
        {
            id: 'read',
            title: 'Read'
        }]

    render() {
        const { allBooks, moveShelf } = this.props
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.shelves.map((shelf) => (
                        <div className="bookshelf" key={shelf.id}>
                            <h2 className="bookshelf-title">{shelf.title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {allBooks.filter((book) => {
                                        return (book.shelf === shelf.id)
                                    })
                                    .map((book) => {
                                        return <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select onChange={(event) => moveShelf(event.target.value, book)} value={book.shelf}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">
                                                    {(book.authors).map((author) =>
                                                    <span className='book-author' key={author}>{author}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    })
                                    }
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks