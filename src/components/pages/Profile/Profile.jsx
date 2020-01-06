import React, { Component } from "react";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    return (
      <div
        style={{
          height: this.state.height - 300
        }}
      >
        <h1>Profile</h1>
        <div>
          The idea here is to have a way to save SPD's that you have ran in the
          past.
        </div>
      </div>
    );
  }
}

export default Profile;
