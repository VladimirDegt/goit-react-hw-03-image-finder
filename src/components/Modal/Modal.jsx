import { Component } from "react";
import PropTypes from 'prop-types';
import { StyledOverlay, StyledImgModal } from "./Modal.styled"

export class Modal extends Component {
  state = {
    isOpen: false,
    largeImageURL: '',
    alt: '',
  }

  componentDidMount() {
    this.setState({
      isOpen: true,
      largeImageURL: this.props.largeImageURL,
      alt: this.props.alt,
    })
    document.addEventListener('keydown', this.handleEsc);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  };

  componentDidUpdate(_, prevState) {
    if(prevState.largeImageURL !== this.props.largeImageURL){
      this.setState({
        isOpen: true,
        largeImageURL: this.props.largeImageURL,
        alt: this.props.alt,
      })
    }
  };

  handleEsc = (e) => {
    if (e.code === "Escape") {
      this.closeModal()
    }
  };

  handleClickBackdrop = (e) => {
    if(e.target.nodeName === "IMG"){
      return
    }
    this.closeModal();
  };

  closeModal = () => {
    this.setState({ 
      isOpen: false,
      largeImageURL: '',
      alt: '',
    });
  };

  render() {
    const {isOpen, largeImageURL, alt} = this.state;

    return (
      <>
      {isOpen && 
        <StyledOverlay onClick={this.handleClickBackdrop}>
        <StyledImgModal >
          <img src={largeImageURL} alt={alt} />
        </StyledImgModal>
      </StyledOverlay>
      }
    </>
    )
  } 
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};


