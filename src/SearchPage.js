import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class SearchPage extends Component {
    state={
        query: '',
        searchRes: [],
        books: []
    }

    componentDidMount() {   //get the initial state of the page by getting all books then filtering them out by their states
        BooksAPI.getAll().then((books) => {
           this.setState({ 
             books: books 
            });  
        })
        //console.log('Books updated');
    }

    componentWillReceiveProps(props) {   //state was changed, reload list of book to set proper book.shelf
        this.setState({ 
            books: props.books 
        });
    }

    updateQuery = (query) => {    // this method will update state query
        this.setState({
            query: query    //allows to searh for multiple words 
        })
        this.updateSearchQuery(query);
    }

    updateSearchQuery = (query) => {
        if (query){     //if there is a search result - fetch the books (query === this.state.query)
            (query === this.state.query)
            BooksAPI.search(query).then((books) => {
                if(query === this.state.query){
                    if(books.error){
                        this.setState({searchRes: []});   //if there is an error make sure that searchQuery still an array (.map())
                } else {
                    this.setState({searchRes: books})
                }
                }
            })
        } else {        //if there is no query - set state as empty arrey 
            this.setState({searchRes: []});
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
                        onChange={(event)=> this.updateQuery(event.target.value)}
                        value={this.props.shelf}    //the value sets depending of selected shelf on MainPage
                        />

                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid"> {
                        this.state.searchRes.map(book => {
                            //by some reason search does not return shelf, so we search for shelf in our book collection
                            book.shelf = 'none';
                            for(var i =0 ; i < this.state.books.length; ++i){
                                if (book.id === this.state.books[i].id){
                                    book.shelf = this.state.books[i].shelf;
                                    break;
                                }
                            }
                            return(
                                <li key={book.id}>
                                    <Book
                                        book={book}         //display books according to the query 
                                        changeShelf = {this.props.changeShelf}
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
