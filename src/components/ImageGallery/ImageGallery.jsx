import { Component } from "react";
import { Spinner } from "spin.js";
import { Notify } from 'notiflix';
import { fetchImage } from "service/api-pixabay";
import { StyledContainerGalerry, StyledItemGalerry, StyledImgGalerry, StyledButtonLoad } from "./ImageGallery.styled";
import { Modal } from "components/Modal/Modal";
import { Button } from "components/Button/Button";

let spinner = new Spinner();

export class ImageGallery extends Component {
  state = {
    inputValue: '',
    largeImageURL: '',
    alt: '',
    pageNumber: 1,
    images: []
  };

  componentDidUpdate(prevProps, _) {
    if(prevProps.inputValue !== this.props.inputValue){
        spinner.spin(document.querySelector('.centered-element'))
        this.setState({
          pageNumber: 1
        });
        
        fetchImage(this.props.inputValue, 1)
          .then((images)=>
          {this.setState({
            images: images.data.hits,
            inputValue: this.props.inputValue,
          })
          if(images.data.hits.length === 0){
            Notify.info('Пробачьте, по Вашему запиту нічого не знайдено!')
            this.setState({
              inputValue: '',
              images: []})
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
      const pageNumber = this.state.pageNumber + 1
    
    fetchImage(this.state.inputValue, pageNumber)
      .then((images)=>
      {this.setState({
        images: [...this.state.images, ...images.data.hits],
      })
      })
      .catch((error)=>{
        Notify.failure('Щось пішло не так!')
        console.log(error)
      })
      .finally(()=>{
        spinner.stop();
      })

    this.setState({
      pageNumber,
    })  
  };
};

  render(){
    const {inputValue, largeImageURL, alt, images} = this.state;

    return (
      <>
      <StyledContainerGalerry>  
        {inputValue && images.map((item)=>{
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
        {inputValue && <StyledButtonLoad type="button" onClick={this.handlerBtnClick}>Load more</StyledButtonLoad>}
        </>
    )}
  }; 

