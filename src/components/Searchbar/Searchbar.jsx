import { Notify } from 'notiflix';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledHeader, StyledForm, StyledFormBtn, StyledFormInput } from './Searchbar.styled';
import IconSearch from 'service/search-svg';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = ({target}) => {
    this.setState({
      inputValue: target.value.toLowerCase().trim(),
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.state.inputValue) {
      this.props.createRequestValue(this.state.inputValue);
      this.setState({
        inputValue: '',
      })
    } else {
      Notify.failure('Поіск порожній та треба ввести значення!')
    };
    
  };

  render() {
    return (
      <StyledHeader>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledFormBtn type="submit">
            <IconSearch>Search</IconSearch>
          </StyledFormBtn>

          <StyledFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          />
        </StyledForm>
      </StyledHeader>
    )

  }
};

Searchbar.propTypes = {
  createRequestValue: PropTypes.func.isRequired
}

export default Searchbar;

