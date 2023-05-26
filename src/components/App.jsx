import { Component } from "react";
import Searchbar from "./Searchbar";

export class App extends Component {
  state = {
    inputValue: null,
  };

  

  render() {
    return (
      <Searchbar/>
    );
  };

};
