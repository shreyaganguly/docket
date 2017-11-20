import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";
import DocketButtons from "./DocketButtons";
import DocketHeader from "./DocketHeader";
import DocketTitle from "./DocketTitle";
import Item from "./Item";
import "./styles.css";

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

  render() {
    let that = this;
    return (
      <MuiThemeProvider>
        <div className="container">
          <DocketButtons
            state={this.state}
            setState={state => this.updateState(state)}
          />
          {this.state.cards.length === 0 && <div className="loader" />}
          {this.state.cards.length !== 0 && (
            <p className="heading">Your Dockets</p>
          )}
          <ul className="board">
            {this.state.cards.map(function(card, i) {
              return (
                <div key={i} className="board__item">
                  <Card
                    style={{
                      backgroundColor: card.backgroundColor
                    }}
                  >
                    <CardHeader subtitle={card.date}>
                      <DocketHeader
                        cardIndex={i}
                        card={card}
                        state={that.state}
                        setState={state => that.updateState(state)}
                      />
                    </CardHeader>
                    <CardTitle>
                      <DocketTitle
                        cardIndex={i}
                        card={card}
                        state={that.state}
                        setState={state => that.updateState(state)}
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
                </div>
              );
            })}
          </ul>
        </div>
      </MuiThemeProvider>
    );
  }
}
