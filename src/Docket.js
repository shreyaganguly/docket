import React, { Component } from "react";
import ActionDelete from "material-ui/svg-icons/action/delete";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { CirclePicker } from "react-color";
import "./styles.css";
import Item from "./Item";
import ImageUpload from "./ImageUpload";
import Audio from "./Audio";
import Util from "./Util";

export default class Docket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  updateState(state) {
    this.setState(state);
  }

  handleAdd(type, e) {
    this.state.cards.unshift({
      disabled: true,
      input: "",
      items: [],
      title: "New Docket",
      type: type,
      circlePickerVisible: false,
      backgroundColor: "white",
      date: Util.formatDate(new Date()),
      timestamp: new Date().getTime()
    });
    this.setState({ cards: this.state.cards });
  }

  handleDelete(index, self, a) {
    self.state.cards.splice(index, 1);
    self.setState({ cards: self.state.cards });
  }
  menuItemTouch(index, self, e, prop) {
    self.state.cards[index].circlePickerVisible = true;
    if (prop.props.primaryText === "Change Color") {
      self.setState({ cards: self.state.cards });
    }
  }
  handleChangeComplete(index, self, color) {
    self.state.cards[index].backgroundColor = color.hex;
    self.state.cards[index].circlePickerVisible = false;
    self.setState({ cards: self.state.cards });
  }
  render() {
    let that = this;
    return (
      <MuiThemeProvider>
        <div className="container">
          <div style={{ position: "fixed", top: 10, left: 20, zIndex: 10 }}>
            <RaisedButton
              backgroundColor="#1e93f1"
              label="Add Notes as checklist"
              labelColor="#fff"
              disabledBackgroundColor="#a4a4a4"
              style={{
                margin: 10
              }}
              onClick={this.handleAdd.bind(this, "text")}
            />
            <RaisedButton
              backgroundColor="#1e93f1"
              label="Add Notes as Image"
              labelColor="#fff"
              style={{
                margin: 10
              }}
              disabledBackgroundColor="#a4a4a4"
              onClick={this.handleAdd.bind(this, "image")}
            />
            <RaisedButton
              backgroundColor="#1e93f1"
              label="Add Notes as Audio"
              labelColor="#fff"
              style={{
                margin: 10
              }}
              disabledBackgroundColor="#a4a4a4"
              onClick={this.handleAdd.bind(this, "audio")}
            />
          </div>

          {this.state.cards.length === 0 && <div className="loader" />}
          {this.state.cards.length !== 0 && (
            <p className="heading">Your Dockets</p>
          )}
          <ul className="board">
            {this.state.cards.map(function(card, i) {
              return (
                <div key={i} className="board__item">
                  {card !== undefined && (
                    <Card
                      style={{
                        backgroundColor: card.backgroundColor
                      }}
                    >
                      <CardHeader subtitle={card.date}>
                        <div>
                          <TextField
                            id="tasks"
                            style={{ margin: 10 }}
                            floatingLabelText="Task Title"
                            defaultValue={card.title}
                            floatingLabelFixed={true}
                            floatingLabelStyle={{
                              fontWeight: "bold",
                              color: "black",
                              fontSize: 20
                            }}
                            inputStyle={{
                              color: "#7d42f4"
                            }}
                          />
                          <ActionDelete
                            style={{ cursor: "pointer" }}
                            onClick={that.handleDelete.bind(this, i, that)}
                          />
                          <IconMenu
                            iconButtonElement={
                              <IconButton>
                                <MoreVertIcon />
                              </IconButton>
                            }
                            anchorOrigin={{
                              horizontal: "left",
                              vertical: "top"
                            }}
                            targetOrigin={{
                              horizontal: "left",
                              vertical: "top"
                            }}
                            onItemTouchTap={that.menuItemTouch.bind(
                              this,
                              i,
                              that
                            )}
                          >
                            <MenuItem primaryText="Change Color" />
                          </IconMenu>
                        </div>
                      </CardHeader>
                      <CardTitle>
                        {card.circlePickerVisible && (
                          <div style={{ width: 244 }}>
                            <CirclePicker
                              colors={[
                                "#f47373",
                                "#697689",
                                "#37d67a",
                                "#555555",
                                "#dce775",
                                "#ff8a65",
                                "#ba68c8",
                                "#ffffff"
                              ]}
                              onChangeComplete={that.handleChangeComplete.bind(
                                this,
                                i,
                                that
                              )}
                            />
                          </div>
                        )}
                      </CardTitle>
                      <CardText>
                        {card.type === "text" && (
                          <Item
                            cardIndex={i}
                            card={card}
                            state={that.state}
                            setState={state => that.updateState(state)}
                          />
                        )}
                        {card.type === "image" && (
                          <ImageUpload
                            cardIndex={i}
                            card={card}
                            state={that.state}
                            setState={state => that.updateState(state)}
                          />
                        )}
                        {card.type === "audio" && (
                          <Audio
                            cardIndex={i}
                            card={card}
                            state={that.state}
                            setState={state => that.updateState(state)}
                          />
                        )}
                      </CardText>
                    </Card>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </MuiThemeProvider>
    );
  }
}
