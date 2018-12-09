import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class AddBook extends Component {
    /**
     * Query to search, the result array of filtered books saved in state
     */
    state = {
        query: '',
        filteredBooks: []
    }

    /**
     * The Books API is searched with the help of query and saved in the filtered books
     * Throttle / Debounce implemented so that search results are only showed after 4 characters are entered
     */
    performSearch = (query) => {
        this.setState({query: query})
        if(this.state.query.length && this.state.query.length > 2) {
            BooksAPI.search(this.state.query).then((searchResult) => {
                this.setState({filteredBooks: searchResult})
            }).catch(() => {
                this.setState({filteredBooks: []})
            })
        }
    }

    /**
     * Props from main App are called to add the book from the search results in the shelves
     */
    moveShelf = (shelf, book) => {
        let doesBookExist = false
        this.props.allBooks && this.props.allBooks.map((oldBook) => {
            if(oldBook.id === book.id) {
                doesBookExist = true
            }
            return book
        })
        if(!doesBookExist) {
            this.props.allBooks.push(book)
        }
        this.props.moveShelf(shelf, book)
    }

    getShelf = (book) => {
        for(let shelfBook of this.props.allBooks) {
           if(shelfBook.id === book.id) {
               return shelfBook.shelf
           }
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {
                        /*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */
                        }
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.performSearch(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {(this.state.query.length) ?
                            (this.state.filteredBooks.length) ?
                                this.state.filteredBooks && this.state.filteredBooks.filter((book) => {
                                    return (book.imageLinks && book.authors)
                                })
                                .map((book) => (
                                    <li key={book.id}>
                                        <div className="book" key={book.name}>
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={(event) => this.moveShelf(event.target.value, book)} value={this.getShelf(book) ? this.getShelf(book) : 'none'}>
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
                                                {book.authors && (book.authors).map((author) =>
                                                <span key={author} className='book-author'>{author}</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))
                                : (
                                    <div>Sorry no books were found that matched your search!</div>
                                )
                            : (
                                <div> Type something to start a search!</div>
                         )}
                    </ol>
                </div>
            </div>
        )
    }
}

AddBook.propTypes = {
    allBooks: PropTypes.array.isRequired,
    moveShelf: PropTypes.func.isRequired
}

export default AddBook