import { Component } from 'react';

class Searchbar extends Component {
  state = {
    inputValue: null,
  };

  handleInputChange = ({target}) => {
    console.log(target);
    this.setState({
      [target.name]: target.value.trim(),
    })
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form">
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