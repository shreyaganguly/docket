import React, { Component } from "react";

export default class Docket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: ""
    };
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleClick() {
    console.log(this.state.input);
  }

  add() {
    console.log("Came hererererere");
    console.log(this.item);
    console.log("gone");
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)} />
        <input
          type="button"
          value="Alert the text input"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}
