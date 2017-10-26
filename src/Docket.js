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
    this.state.items.unshift(this.state.input);
    this.setState({ items: this.state.items, input: "" });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange.bind(this)}
        />
        <input
          type="button"
          value="Alert the text input"
          onClick={this.handleClick.bind(this)}
        />
        <ul>
          {this.state.items.map(function(item, i) {
            return <li key={i}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
