import React from "react";
import FlatButton from "material-ui/FlatButton";
import "./styles.css";
export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "", imagePreviews: [] };
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.state.imagePreviews.unshift(reader.result);
      this.props.state.cards[
        this.props.cardIndex
      ].items = this.state.imagePreviews;
      this.props.setState({ cards: this.props.state.cards });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <div className="previewComponent">
        <FlatButton
          containerElement="label"
          label="Choose FILES"
          labelPosition="before"
          onChange={e => this.handleImageChange(e)}
        >
          <input type="file" />
        </FlatButton>
        <div className="imgPreview">
          <ul className="boardImage">
            {this.props.card.items.map((imagePreview, i) => {
              return (
                <div key={i} className="board__image">
                  <img alt="" src={imagePreview} />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
