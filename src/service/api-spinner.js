import {Spinner} from 'spin.js';

let spinner = new Spinner();

export function startSpinner(){
  spinner.spin(document.querySelector('.centered-element'))
};

export function stopSpinner(){
  spinner.stop();
};
