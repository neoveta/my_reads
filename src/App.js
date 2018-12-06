import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends React.Component {
  state = {
    books:[]
  }
  componentDidMount() {   //get the initial state of the page by getting all books then filtering them out by their states
    BooksAPI.getAll().then((books) => { // get books on load
      this.setState({ 
        books: books
      }) 
    })
  }

  changeShelf = (book,shelf) => {
    //console.log('UPDATE,', book, shelf);
    BooksAPI.update(book,shelf).then(response => {
      BooksAPI.getAll().then((books) => { // get books on load
        this.setState({ 
          books: books
        }) 
      })
    });

  }
  
  render() { 
    //console.log(this.state.books);
    return (
      <div className="app">
      <Switch>
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
      </Switch>  
      </div>
    )
  }
}

export default App
