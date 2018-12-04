import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class SearchPage extends Component {
    state={
        query: '',
        searchQuery: []
    }

    updateQuery = (query) => {    // this method will update state query
        this.setState({
            query: query    //allows to searh for multiple words 
        })
        this.updateSearchQuery(query);
    }

    updateSearchQuery = (query) => {
        if (query){     //if there is a query - fetch the books
            BooksAPI.search(query).then((searchQuery) => {
                if(searchQuery.error){
                    this.setState({searchQuery: []});   //if there is an error make sure that searchQuery still an arrey (.map())
                } else{
                    this.setState({searchQuery: searchQuery})

                }
            })
        } else {        //if there is no query - set state as empty arrey 
            this.setState({searchQuery: []});
        }
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event)=> this.updateQuery(event.target.value)}
                        />

                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid"> {
                        this.state.searchQuery.map(searchQuery => {
                            let shelf ="none";
                        this.props.books.map(book => (
                            book.id === searchQuery.id ?
                            shelf = book.shelf :
                            ''           
                        ));
                            return(
                                <li key={searchQuery.id}>
                                    <Book
                                        book={searchQuery}         //display books according to the query 
                                        moveShelf = {this.props.moveShelf}  // select value to place the book in a certain shelf
                                        currentValue = {shelf}  //set value 'none' for books that non assighmed to any shelf 
                                        />  
                                    </li>
                            )}
                        )}
                    </ol>
                </div>
          </div>
        );
    }
}
export default SearchPage;    
