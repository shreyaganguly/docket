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

import Item from "./Item";

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
      title: "New Docket"
    });
    this.setState({ cards: this.state.cards });
  }

  handleDelete(index, self, a) {
    delete self.state.cards[index];
    self.setState({ cards: self.state.cards });
  }
  check(a, b) {
    console.log("Hello World");
    console.log(a, b.props.primaryText);
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
                  <Card>
                    <CardHeader
                      title={`Docket #${i + 1}`}
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
                        onItemTouchTap={that.check.bind(this)}
                      >
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Send feedback" />
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Help" />
                        <MenuItem primaryText="Sign out" />
                      </IconMenu>
                    </CardHeader>
                    <CardTitle>
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
