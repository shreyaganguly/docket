import React from "react";
import ImageUploader from "react-images-upload";

export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }

  render() {
    return (
      <ImageUploader
        withIcon={true}
        buttonText="Choose images as your Docket"
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".JPG", ".PNG", ".GIF"]}
        maxFileSize={8242880}
      />
    );
  }
}
