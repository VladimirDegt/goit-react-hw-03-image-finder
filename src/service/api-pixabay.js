import axios from "axios";

const API_KEY = '35689289-d239eabcb13b35ae6aaf4f6ed';
const BASE_URL = 'https://pixabay.com/api';

export function fetchImage(inputValue){
  if(!inputValue){
    return
  }

  return axios(`${BASE_URL}/?key=${API_KEY}&q=${inputValue}&page=1&image_type=photo&orientation=horizontal&per_page=12`)

};
