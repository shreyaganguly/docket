import React, { Component } from "react";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

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
      items: []
    });
    this.setState({ cards: this.state.cards, input: "", disabled: true });
  }

  handleDelete(index, self, a) {
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
                      <Item
                        cardIndex={i}
                        card={card}
                        state={that.state}
                        setState={state => that.updateState(state)}
                      />
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
