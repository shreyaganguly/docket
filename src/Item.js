import React, { Component } from "react";
import Text from "./Text";
import Image from "./Image";
import Audio from "./Audio";

export default class Item extends Component {
  render() {
    const { card } = this.props;
    return (
      <div>
        {card.type === "text" && <Text {...this.props} />}
        {card.type === "image" && <Image {...this.props} />}
        {card.type === "audio" && <Audio {...this.props} />}
      </div>
    );
  }
}
