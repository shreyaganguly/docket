import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

export default class Docket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  handleChange(index, self, e) {
    self.state.cards[index].input = e.target.value;
    if (e.target.value.length > 0) {
      self.state.cards[index].disabled = false;
    } else {
      self.state.cards[index].disabled = true;
    }
    self.setState({ cards: self.state.cards });
  }

  handleClick(index, self, e) {
    self.state.cards[index].items.unshift({
      task: self.state.cards[index].input,
      decoration: { textDecoration: "none" },
      checked: false
    });
    self.state.cards[index].input = "";
    self.setState({ cards: self.state.cards, disabled: true });
  }

  handleAdd() {
    this.state.cards.unshift({
      disabled: true,
      input: "",
      items: []
    });
    this.setState({ cards: this.state.cards, input: "", disabled: true });
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

  handleDelete(index, self, a) {
    console.log("Hello Hello");
    console.log(index);
    console.log(a);
    delete self.state.cards[index];
    self.setState({ cards: self.state.cards });
  }

  render() {
    let that = this;
    return (
      <MuiThemeProvider>
        <div>
          <FloatingActionButton
            style={{
              position: "absolute",
              top: 10,
              left: 20
            }}
            onClick={this.handleAdd.bind(this)}
          >
            <ContentAdd />
          </FloatingActionButton>
          {this.state.cards.map(function(card, i) {
            return (
              <ul>
                {card !== undefined && (
                  <Card>
                    <CardHeader
                      title={`Docket #${i + 1}`}
                      subtitle="Your Tasks"
                    />
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardText>
                      {" "}
                      <TextField
                        id="tasks"
                        value={card.input}
                        style={{ margin: 10 }}
                        floatingLabelText="Enter your task"
                        onChange={that.handleChange.bind(this, i, that)}
                      />
                      <RaisedButton
                        backgroundColor="#1e93f1"
                        label="Add this"
                        labelColor="#fff"
                        disabled={card.disabled}
                        disabledBackgroundColor="#a4a4a4"
                        onClick={that.handleClick.bind(this, i, that)}
                      />
                      <ul>
                        {card.items.map(function(item, j) {
                          return (
                            <div key={j}>
                              <Checkbox
                                label={item.task}
                                labelStyle={item.decoration}
                                checked={item.checked}
                                onCheck={that.handleCheck.bind(
                                  this,
                                  i,
                                  j,
                                  that
                                )}
                              />
                            </div>
                          );
                        })}
                      </ul>
                    </CardText>
                    <CardActions>
                      <FlatButton
                        label="Delete"
                        onClick={that.handleDelete.bind(this, i, that)}
                      />
                    </CardActions>
                  </Card>
                )}
              </ul>
            );
          })}
        </div>
      </MuiThemeProvider>
    );
  }
}
