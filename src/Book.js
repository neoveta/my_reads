import React, {Component} from 'react';

class Book extends Component {
    render(){
     // console.log(this.props.book);
      let bookThumbnail = this.props.book.imageLinks ?
      this.props.book.imageLinks.thumbnail : 
      '';
        return(
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookThumbnail}"`}}></div>
              <div className="book-shelf-changer">
                <select
                onChange={(event) => this.props.changeShelf(   //updates the value of book (current shelf for book)
                    this.props.book, event.target.value         //if we change the value of book it will be past here 
                )}
                value={this.props.book.shelf} //the value sets depending of selected shelf. value in select the same as current shelf
                >
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
          </div>
        )
    }
}

export default Book;   