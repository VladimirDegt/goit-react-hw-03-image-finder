import { Component } from "react";
import { Spinner } from "spin.js";
import { Notify } from 'notiflix';
import { fetchImage } from "service/api-pixabay";
import { StyledContainerGalerry, StyledItemGalerry, StyledImgGalerry } from "./ImageGallery.styled";
import { Modal } from "components/Modal/Modal";

let spinner = new Spinner();

export class ImageGallery extends Component {
  state = {
    inputValue: '',
    largeImageURL: '',
    alt: '',
  };

  componentDidUpdate(prevProps, _) {
    if(prevProps.inputValue !== this.props.inputValue){
        spinner.spin(document.querySelector('.centered-element'))
        fetchImage(this.props.inputValue)
          .then((images)=>
          {this.setState({inputValue: images.data.hits})
          if(images.data.hits.length === 0){
            Notify.info('Пробачьте, по Вашему запиту нічого не знайдено!')
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

  render(){
    const {inputValue, largeImageURL, alt} = this.state;

    return (
      <StyledContainerGalerry>
        {inputValue && inputValue.map((item)=>{
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
        {largeImageURL && <Modal 
        largeImageURL={largeImageURL}
        alt= {alt}
        />}
      </StyledContainerGalerry>
    )}
  }; 
