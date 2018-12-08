import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import AddBook from './AddBook'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
  state = {
    allBooks: []
  }

  /**
   * Move a book from one shelf to another
   */
  moveShelf = (shelfName, book) => {
    this.setState((state) => ({
      allBooks: state.allBooks.map((eachBook) => {
        if(book.title === eachBook.title) {
          eachBook.shelf = shelfName
        }
        return eachBook
    })
    }))
    BooksAPI.update(book, shelfName)
  }

  /**
   * Setting the state after loading the component
   * All Books from the API are received and the setState method is called
   */
  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks : allBooks})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            allBooks = { this.state.allBooks }
            moveShelf = {this.moveShelf}
         />
        )}/>
        <Route path="/search" render={() => (
          <AddBook
            allBooks = { this.state.allBooks }
            moveShelf = { this.moveShelf }
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp