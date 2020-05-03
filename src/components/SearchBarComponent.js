import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import { search } from "../BooksAPI";

export default class SearchBarComponent extends Component {
  state = {
    searchText: "",
    searchItems: [],
  };

  handleOnChange = (e) => {
    const { value } = e.target;
    this.setState({ searchText: value });
    if (this.state.searchText !== "") {
      search(value).then((res) => {
        if (res === undefined)
          this.setState({
            searchItems: [],
          });
        else if (res.error === undefined) {
          const result = res.filter((r) => r.imageLinks !== undefined);
          this.setState({ searchItems: result });
        } else this.setState({ searchItems: [] });
      });
    }
  };

  clearSearchText = (book, value) => {
    const { updateBookStatus } = this.props;
    this.setState({ searchText: "" });
    updateBookStatus(book, value);
  };

  render() {
    const { searchItems, searchText } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchText}
              onChange={this.handleOnChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          {searchItems.length === 0 && searchText !== "" && (
            <span style={{ color: "#fbaacf" }}> "No Books Found" </span>
          )}
          <BookList
            books={searchItems}
            updateBookStatus={this.clearSearchText}
          />
        </div>
      </div>
    );
  }
}
