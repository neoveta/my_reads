import React from 'react';
import {Route} from 'react-router-dom';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI';
import './App.css';
//import Bookshelf from './Bookshelf';

class App extends React.Component {
  state = {
    books:[]  //create book arrey
  }
  componentDidMount() {   //get the initial state of the page by getting all books then filtering them out by their states
    BooksAPI.getAll().then((books) => {
      this.setState({ 
        books: books 
      });
    })
  }

  changeShelf = (book,shelf) => {
    BooksAPI.update(book,shelf);
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
    
  }

  render() { 
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <MainPage 
          books={this.state.books}
          changeShelf={this.changeShelf} 
          />
        )} />

        <Route path="/search" render={() => (
          <SearchPage 
          books={this.state.books}
          changeShelf={this.changeShelf} 
          />
        )} />
      </div>
    )
  }

}

export default App
