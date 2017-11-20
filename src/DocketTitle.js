import React, { Component } from "react";
import { CirclePicker } from "react-color";
export default class DocketTitle extends Component {
  constructor(props) {
    super(props);
  }
  handleChangeComplete(color) {
    this.props.state.cards[this.props.cardIndex].backgroundColor = color.hex;
    this.props.state.cards[this.props.cardIndex].circlePickerVisible = false;
    this.props.setState({ cards: this.props.state.cards });
  }
  render() {
    const { card } = this.props;
    return (
      <div>
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
              onChangeComplete={this.handleChangeComplete.bind(this)}
            />
          </div>
        )}
      </div>
    );
  }
}
