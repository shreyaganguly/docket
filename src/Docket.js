import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class Docket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: "",
      disabled: true
    };
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
    if (e.target.value.length > 0) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick() {
    this.state.items.unshift({
      task: this.state.input,
      decoration: { textDecoration: "none" },
      checked: false
    });
    this.setState({ items: this.state.items, input: "", disabled: true });
  }
  handleCheck(index, self, a) {
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
      <MuiThemeProvider>
        <div>
          <TextField
            id="tasks"
            value={this.state.input}
            style={{ margin: 10 }}
            onChange={this.handleChange.bind(this)}
          />
          <RaisedButton
            backgroundColor="#1e93f1"
            label="Add your tasks"
            labelColor="#fff"
            disabled={this.state.disabled}
            disabledBackgroundColor="#a4a4a4"
            onClick={this.handleClick.bind(this)}
          />

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
        </div>
      </MuiThemeProvider>
    );
  }
}
