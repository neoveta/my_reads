import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Bookshelf from './Bookshelf'

class MainPage extends Component {
  render (){
    let currentlyReading = this.props.books.filter(book => book.shelf === "currentlyReading"); 
    let wantToRead = this.props.books.filter(book => book.shelf === "wantToRead");
    let read = this.props.books.filter(book => book.shelf === "read");
    
    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
         <div className="list-books-content">
            <Bookshelf title="Currently Reading" books={currentlyReading} changeShelf={this.props.changeShelf} />
            <Bookshelf title="Want To read" books={wantToRead} changeShelf={this.props.changeShelf}/>
            <Bookshelf title="Read" books={read} changeShelf={this.props.changeShelf}/>
          </div>
          <div className="open-search">
            <Link to="/search" >Add a book</Link>
            </div>
          </div>    
    );
  }
}

export default MainPage;   