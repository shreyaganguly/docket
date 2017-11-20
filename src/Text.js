import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";
import Util from "./Util";

export default class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.state.cards
    };
  }

  handleChange(index, self, e) {
    self.state.cards[index].input = e.target.value;
    if (e.target.value.length > 0) {
      self.state.cards[index].disabled = false;
    } else {
      self.state.cards[index].disabled = true;
    }
    self.props.setState({ cards: self.state.cards });
  }

  handleEnter(index, self, e) {
    if (e.key === "Enter" && self.state.cards[index].input !== "") {
      self.state.cards[index].items.unshift({
        task: self.state.cards[index].input,
        decoration: { textDecoration: "none" },
        checked: false
      });
      self.state.cards[index].input = "";
      self.state.cards[index].timestamp = new Date().getTime();
      self.state.cards[index].date = Util.formatDate(new Date());
      self.state.cards[index].disabled = true;
      // self.state.cards.sort(Util.compare);
      self.props.setState({ cards: self.state.cards });
    }
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
    self.state.cards[cardIndex].timestamp = new Date().getTime();
    self.state.cards[cardIndex].date = Util.formatDate(new Date());
    // self.state.cards.sort(Util.compare);
    self.props.setState({ cards: self.state.cards });
  }

  render() {
    let that = this;
    const { cardIndex, card } = this.props;
    return (
      <div>
        <TextField
          id="tasks"
          value={card.input}
          style={{ margin: 10 }}
          floatingLabelText="Enter your task"
          autoFocus={true}
          onChange={that.handleChange.bind(this, cardIndex, that)}
          onKeyPress={that.handleEnter.bind(this, cardIndex, that)}
        />
        {card.items.map(function(item, j) {
          return (
            <div key={j}>
              <Checkbox
                style={{ marginLeft: 10 }}
                label={item.task}
                labelStyle={item.decoration}
                checked={item.checked}
                onCheck={that.handleCheck.bind(this, cardIndex, j, that)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
