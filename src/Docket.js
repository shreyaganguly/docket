import React, { Component } from "react";
import ContentAdd from "material-ui/svg-icons/content/add";
import ActionDelete from "material-ui/svg-icons/action/delete";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { CirclePicker } from "react-color";

import Item from "./Item";

function formatDate(date) {
  var d, hours, monthNames, mid;
  d = new Date();
  hours = d.getHours();
  monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  mid = "AM";
  if (hours == 12) {
    //At 00 hours we need to show 12 am
    mid = "PM";
  } else if (hours > 12) {
    hours = hours % 12;
    mid = "PM";
  }
  return `${("0" + d.getDate()).slice(-2)} ${monthNames[
    d.getMonth()
  ]} ${d.getFullYear()} ${("0" + hours).slice(-2)}:${("0" + d.getMinutes()
  ).slice(-2)} ${mid}`;
}

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

  handleAdd() {
    this.state.cards.unshift({
      disabled: true,
      input: "",
      items: [],
      title: "New Docket",
      circlePickerVisible: false,
      backgroundColor: "white",
      date: formatDate(new Date())
    });
    this.setState({ cards: this.state.cards });
  }

  handleDelete(index, self, a) {
    delete self.state.cards[index];
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
              <ul key={i}>
                {card !== undefined && (
                  <Card style={{ backgroundColor: card.backgroundColor }}>
                    <CardHeader
                      title={`Docket #${i + 1}`}
                      subtitle={card.date}
                      titleStyle={{ marginTop: 20 }}
                    >
                      <ActionDelete
                        style={{ marginLeft: 70, cursor: "pointer" }}
                        onClick={that.handleDelete.bind(this, i, that)}
                      />
                      <IconMenu
                        iconButtonElement={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        anchorOrigin={{ horizontal: "left", vertical: "top" }}
                        targetOrigin={{ horizontal: "left", vertical: "top" }}
                        onItemTouchTap={that.menuItemTouch.bind(this, i, that)}
                      >
                        <MenuItem primaryText="Change Color" />
                      </IconMenu>
                    </CardHeader>
                    <CardTitle>
                      {card.circlePickerVisible && (
                        <div style={{ width: 244 }}>
                          <CirclePicker
                            colors={[
                              "#F47373",
                              "#697689",
                              "#37D67A",
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
                    </CardTitle>
                    <CardText>
                      <Item
                        cardIndex={i}
                        card={card}
                        state={that.state}
                        setState={state => that.updateState(state)}
                      />
                    </CardText>
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
