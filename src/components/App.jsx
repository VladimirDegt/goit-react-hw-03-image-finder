import { Component } from "react";
import { Global } from '@emotion/react';
import { Notify } from 'notiflix';
import Searchbar from "./Searchbar";
import { Spinner } from "./Spinner/Spinner";
import { fetchImage } from "service/api-pixabay";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { StyledContainer, StyledButtonLoad  } from "./App.styled";
import '../styles/spin.css'
import { global } from "styles/global-styles";
import { startSpinner, stopSpinner } from "service/api-spinner";

export class App extends Component {
  state = {
    inputValue: '',
    pageNumber: '',
    images: '',
    isButtonDisabled: false,
  };

  componentDidUpdate(_, prevState){
    if(prevState.inputValue !== this.state.inputValue){
      startSpinner();

      fetchImage(this.state.inputValue, this.state.pageNumber)
      .then((images)=>{

        this.setState({
          images: images.data.hits,
          isButtonDisabled: true,
          pageNumber: this.state.pageNumber + 1,
        })

        if(images.data.hits.length === 0){
          Notify.info('Пробачьте, по Вашему запиту нічого не знайдено!')
          this.setState({
            images: '',
            pageNumber: 1,
            isButtonDisabled: false,
          })
          stopSpinner()
          return
        }

        if(images.data.hits.length < 12){
          Notify.info(`по Вашему запиту знайдено ${images.data.hits.length} картинок`)
          this.setState({
            isButtonDisabled: false,
          })
        }

      })
      .catch((error)=>{
        Notify.failure('Щось пішло не так!')
        console.log(error)
      })
      .finally(()=>{
        stopSpinner()
      })
    }
  };

  createRequestValue = (inputValue) => {
    this.setState({
      inputValue,
      pageNumber: 1,
    })
  };

  handlerBtnClick = () => {
    startSpinner()
    fetchImage(this.state.inputValue, this.state.pageNumber)
      .then((images)=>{
      this.setState((prevState)=>({
        images: [...this.state.images, ...images.data.hits],
        pageNumber: prevState.pageNumber + 1,
      }))
      if(images.data.hits.length < 12){
        Notify.info('Пробачьте, по Вашему запиту більше нічого не знайдено!')
        this.setState({
          isButtonDisabled: false
        })
      }
      })
      .catch((error)=>{
        Notify.failure('Щось пішло не так!')
        console.log(error)
      })
      .finally(()=>{
        stopSpinner()
      }) 
};

  render() {
    const {images, isButtonDisabled} = this.state

    return (
      <>
      <Global styles={global}/>
        <StyledContainer>
          <Searchbar createRequestValue={this.createRequestValue}/>
          {images && <ImageGallery images={images} isOpen={false}/>}
          {isButtonDisabled && 
            <StyledButtonLoad 
            type="button"
            onClick={this.handlerBtnClick}>
            Load more
            </StyledButtonLoad>}
        </StyledContainer>
        <Spinner/>
      </>
    );
  };
};
