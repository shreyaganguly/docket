import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.state.cards
    };
  }

  handleChange(index, self, e) {
    console.log(self.state.cards);
    self.state.cards[index].input = e.target.value;
    if (e.target.value.length > 0) {
      self.state.cards[index].disabled = false;
    } else {
      self.state.cards[index].disabled = true;
    }
    self.props.setState({ cards: self.state.cards });
  }

  handleClick(index, self, e) {
    self.state.cards[index].items.unshift({
      task: self.state.cards[index].input,
      decoration: { textDecoration: "none" },
      checked: false
    });
    self.state.cards[index].input = "";
    self.state.cards[index].disabled = true;
    self.setState({ cards: self.state.cards });
  }

  handleCheck(cardIndex, itemIndex, self, a) {
    var item = self.state.cards[cardIndex].items[itemIndex];
    if (item.checked === false) {
      item.checked = true;
      item.decoration = { textDecoration: "line-through" };
    } else {
      item.checked = false;
      item.decoration = { textDecoration: "none" };
    }
    self.setState({ cards: self.state.cards });
  }

  render() {
    let that = this;
    const { cardIndex, card } = this.props;
    console.log("*******************");
    console.log("*******************");
    return (
      <div>
        <TextField
          id="tasks"
          value={card.input}
          style={{ margin: 10 }}
          floatingLabelText="Enter your task"
          onChange={that.handleChange.bind(this, cardIndex, that)}
        />
        <RaisedButton
          backgroundColor="#1e93f1"
          label="Add this"
          labelColor="#fff"
          disabled={card.disabled}
          disabledBackgroundColor="#a4a4a4"
          onClick={that.handleClick.bind(this, cardIndex, that)}
        />
        <ul>
          {card.items.map(function(item, j) {
            return (
              <div key={j}>
                <Checkbox
                  label={item.task}
                  labelStyle={item.decoration}
                  checked={item.checked}
                  onCheck={that.handleCheck.bind(this, cardIndex, j, that)}
                />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}