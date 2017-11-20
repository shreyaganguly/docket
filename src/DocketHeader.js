import React, { Component } from "react";
import ActionDelete from "material-ui/svg-icons/action/delete";
import TextField from "material-ui/TextField";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconButton from "material-ui/IconButton";

export default class DocketHeader extends Component {
  constructor(props) {
    super(props);
  }

  handleDelete(a) {
    this.props.state.cards.splice(this.props.cardIndex, 1);
    this.props.setState({ cards: this.props.state.cards });
  }

  menuItemTouch(e, prop) {
    this.props.state.cards[this.props.cardIndex].circlePickerVisible = true;
    if (prop.props.primaryText === "Change Color") {
      this.props.setState({ cards: this.props.state.cards });
    }
  }

  render() {
    const { card } = this.props;
    return (
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
          onClick={this.handleDelete.bind(this)}
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
          onItemTouchTap={this.menuItemTouch.bind(this)}
        >
          <MenuItem primaryText="Change Color" />
        </IconMenu>
      </div>
    );
  }
}
