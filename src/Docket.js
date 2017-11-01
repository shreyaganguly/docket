import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

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
    this.state.items.unshift({
      task: this.state.input,
      decoration: { textDecoration: "none" },
      checked: false
    });
    this.setState({ items: this.state.items, input: "" });
  }
  handleCheck(index, self, a) {
    console.log("Came here");
    var item = self.state.items[index];
    if (item.checked === false) {
      item.checked = true;
      item.decoration = { textDecoration: "line-through" };
    } else {
      item.checked = false;
      item.decoration = { textDecoration: "none" };
    }
    self.setState({ items: self.state.items });
  }

  render() {
    let that = this;
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange.bind(this)}
        />
        <input
          type="button"
          value="Add your tasks"
          onClick={this.handleClick.bind(this)}
        />
        <MuiThemeProvider>
          <ul>
            {this.state.items.map(function(item, i) {
              return (
                <div key={i}>
                  <Checkbox
                    label={item.task}
                    labelStyle={item.decoration}
                    checked={item.checked}
                    onCheck={that.handleCheck.bind(this, i, that)}
                  />
                </div>
              );
            })}
          </ul>
        </MuiThemeProvider>
      </div>
    );
  }
}
