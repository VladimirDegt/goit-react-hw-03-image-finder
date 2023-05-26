import { Component } from "react";
import { Spinner } from "spin.js";
import { Notify } from 'notiflix';
import { fetchImage } from "service/api-pixabay";

let spinner = new Spinner();

export class ImageGallery extends Component {
  state = {
    inputValue: '',
    error: '',
  }

  async componentDidUpdate(prevProps, _) {
    if(prevProps.inputValue !== this.props.inputValue){
      try{
        spinner.spin(document.querySelector('.centered-element'));
        const response = await fetchImage(this.props.inputValue)
        this.setState({inputValue:response.hits})
        spinner.stop()
      } catch(error) {
        this.setState({error})
        spinner.stop()
      }

    } 
  };

  render(){
    const {inputValue, error} = this.state;

    return (
      <ul className="gallery">
        {error && Notify.failure('Щось пішло не так!') }
      {inputValue && inputValue.map((item)=>{
        return (
          <li className="gallery-item" key="item.id">
            <img src={item.webformatURL} alt={item.tags} />
          </li>
        )
      })}

      </ul>
      )}
  }; 
