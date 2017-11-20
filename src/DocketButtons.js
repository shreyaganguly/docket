import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import Util from "./Util";

export default class DocketButtons extends Component {
  constructor(props) {
    super(props);
  }
  handleAdd(type, e) {
    this.props.state.cards.unshift({
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
    this.props.setState({ cards: this.props.state.cards });
  }
  render() {
    return (
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
    );
  }
}
