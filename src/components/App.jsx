import { Component } from "react";
import { Global } from '@emotion/react';

import Searchbar from "./Searchbar";
import { Spinner } from "./Spinner/Spinner";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { StyledContainer } from "./App.styled";
import '../styles/spin.css'
import { global } from "styles/global-styles";

export class App extends Component {
  state = {
    inputValue: '',
  };

  createRequestValue = (inputValue) => {
    this.setState({
      inputValue,
    })
  };

  render() {
    return (
      <>
      <Global styles={global}/>
        <StyledContainer>
          <Searchbar createRequestValue={this.createRequestValue}/>
          <Spinner/>
          <ImageGallery inputValue={this.state.inputValue}/>
        </StyledContainer>
      </>
    );
  };

};
