import { Component } from "react";
import { Spinner } from "spin.js";
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { fetchImage } from "service/api-pixabay";
import { StyledContainerGalerry, StyledItemGalerry, StyledImgGalerry, StyledButtonLoad } from "./ImageGallery.styled";
import { Modal } from "components/Modal/Modal";
// import { Button } from "components/Button/Button";

let spinner = new Spinner();

export class ImageGallery extends Component {
  state = {
    inputValue: '',
    largeImageURL: '',
    alt: '',
    pageNumber: 1,
    images: [],
    isButtonDisabled: false,
  };

  componentDidUpdate(prevProps, _) {
    if(prevProps.inputValue !== this.props.inputValue){
        spinner.spin(document.querySelector('.centered-element'))
        const pageNumber = 1;
        fetchImage(this.props.inputValue, pageNumber)
          .then((images)=>
          {this.setState({
            images: images.data.hits,
            inputValue: this.props.inputValue,
            pageNumber: 2,
          })
          if(images.data.hits.length === 0){
            Notify.info('Пробачьте, по Вашему запиту нічого не знайдено!')
            this.setState({
              inputValue: '',
              images: [],
              isButtonDisabled: false,
            })
          } else if (images.data.hits.length < 12){
            Notify.info(`по Вашему запиту знайдено ${images.data.hits.length} картинок`)
            this.setState({
              isButtonDisabled: false
            })
          } else {
            this.setState({
              isButtonDisabled: true
            })
          }
          })
          .catch((error)=>{
            Notify.failure('Щось пішло не так!')
            console.log(error)
          })
          .finally(()=>{
            spinner.stop();
          })
      }
  };

  handlerImgClick = (largeImageURL, alt) => {
    this.setState({largeImageURL, alt})
  };

  handlerBtnClick = () => {
    if(this.state.inputValue === this.props.inputValue) {
    
    fetchImage(this.state.inputValue, this.state.pageNumber)
      .then((images)=>
      {if(images.data.hits.length < 12){
        Notify.info('Пробачьте, по Вашему запиту більше нічого не знайдено!')
        this.setState({
          isButtonDisabled: false
        })
        return
      }
        this.setState((prevState)=>({
          images: [...this.state.images, ...images.data.hits],
          pageNumber: prevState.pageNumber + 1,
      }))
      })
      .catch((error)=>{
        Notify.failure('Щось пішло не так!')
        console.log(error)
      })
      .finally(()=>{
        spinner.stop();
      }) 
  };
};

  render(){
    const {inputValue, largeImageURL, alt, images, isButtonDisabled} = this.state;

    return (
      <>
      <StyledContainerGalerry>  
        {inputValue && 
        images.map((item)=>{
          return (
            <StyledItemGalerry key={item.id}>
              <StyledImgGalerry 
                src={item.webformatURL} 
                alt={item.tags} 
                onClick={()=>this.handlerImgClick(item.largeImageURL, item.tags)}
              />
            </StyledItemGalerry>
          )
        })}
        {largeImageURL && 
        <Modal 
          largeImageURL={largeImageURL}
          alt = {alt}
        />}
      </StyledContainerGalerry>
        {isButtonDisabled && 
        <StyledButtonLoad 
          type="button"
          onClick={this.handlerBtnClick}>
            Load more
        </StyledButtonLoad>}
        </>
    )}
  }; 

ImageGallery.propTypes = {
  inputValue: PropTypes.string.isRequired,
}
