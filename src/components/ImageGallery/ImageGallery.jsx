import { Component } from "react";
import { Spinner } from "spin.js";
import { Notify } from 'notiflix';
import { fetchImage } from "service/api-pixabay";
import { StyledContainerGalerry, StyledItemGalerry, StyledImgGalerry } from "./ImageGallery.styled";

let spinner = new Spinner();

export class ImageGallery extends Component {
  state = {
    inputValue: '',
  };

  componentDidUpdate(prevProps, _) {
    if(prevProps.inputValue !== this.props.inputValue){
        spinner.spin(document.querySelector('.centered-element'))
        fetchImage(this.props.inputValue)
          .then((images)=>
          {this.setState({inputValue:images.data.hits})
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

  render(){
    const {inputValue} = this.state;

    return (
      <StyledContainerGalerry>
        {inputValue && inputValue.map((item)=>{
          return (
            <StyledItemGalerry key={item.id}>
              <StyledImgGalerry src={item.webformatURL} alt={item.tags} />
            </StyledItemGalerry>
          )
        })}
      </StyledContainerGalerry>
    )}
  }; 
