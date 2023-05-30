import { Component } from "react";
import PropTypes, { object } from 'prop-types';
import { StyledContainerGalerry, StyledItemGalerry, StyledImgGalerry} from "./ImageGallery.styled";
import { Modal } from "components/Modal/Modal";

export class ImageGallery extends Component {
  state = {
    largeImageURL: '',
    alt: '',
  };

  clearStateAfterCloseModal = ()=>{
    this.setState({
      largeImageURL: '', 
      alt: '',
    })
  }

  handlerImgClick = (largeImageURL, alt) => {
    this.setState({largeImageURL, alt})
  };

  render(){
    const {largeImageURL, alt} = this.state;
    return (
      <StyledContainerGalerry>  
        {this.props.images.map((item)=>{
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
        <Modal 
          largeImageURL={largeImageURL}
          alt = {alt}
          clearStateAfterCloseModal = {this.clearStateAfterCloseModal}
        />
      </StyledContainerGalerry>
    )}
  }; 

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(object).isRequired,
}
