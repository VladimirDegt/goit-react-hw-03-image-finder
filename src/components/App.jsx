import { Component } from "react";
import Searchbar from "./Searchbar";
import { StyledContainer } from "./App.styled";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import '../styles/spin.css'

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
      <StyledContainer>
        <Searchbar createRequestValue={this.createRequestValue}/>
        <div className="centered-element"></div>
        <ImageGallery inputValue={this.state.inputValue}/>
      </StyledContainer>
    );
  };

};
