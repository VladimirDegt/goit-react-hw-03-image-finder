import { Component } from 'react';

class Searchbar extends Component {
  state = {
    inputValue: null,
  };

  handleInputChange = ({target}) => {
    this.setState({
      [target.name]: target.value.toLowerCase().trim(),
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()


  }

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            name="inputValue"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    )

  }
};

export default Searchbar;