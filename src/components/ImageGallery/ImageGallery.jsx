import { Component } from "react";
import { Spinner } from "spin.js";
import { Notify } from 'notiflix';
import { fetchImage } from "service/api-pixabay";

let spinner = new Spinner();
// spinner.spin(document.querySelector('.centered-element'));
// spinner.stop()
// {error && Notify.failure('Щось пішло не так!') }
export class ImageGallery extends Component {
  state = {
    inputValue: '',
    error: '',
  }

  componentDidUpdate(prevProps, _) {
    if(prevProps.inputValue !== this.props.inputValue){
        fetchImage(this.props.inputValue)
          .then((images)=>this.setState({inputValue:images.data.hits}))
        spinner.stop()
      } 
  };

  render(){
    const {inputValue, error} = this.state;

    return (
      <ul className="gallery">
      {inputValue && inputValue.map((item)=>{
        return (
          <li className="gallery-item" key={item.id}>
            <img src={item.webformatURL} alt={item.tags} />
          </li>
        )
      })}

      </ul>
      )}
  }; 
