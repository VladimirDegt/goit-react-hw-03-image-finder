import { Notify } from 'notiflix';
import { Component } from 'react';
import { StyledHeader, StyledForm, StyledFormBtn, StyledFormBtnLabel, StyledFormInput } from './Searchbar.styled';

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
            <StyledFormBtnLabel>Search</StyledFormBtnLabel>
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

export default Searchbar;