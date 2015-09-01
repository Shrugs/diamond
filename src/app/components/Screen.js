'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class Screen extends React.Component {

  propTypes: {
    metadata: React.PropTypes.object,
  }

  constructor() {
    super();

    this.screenshot = this.screenshot.bind(this);
    this.metadata = this.metadata.bind(this);
    this.content = this.content.bind(this);
  }

  componentDidMount() {
    var video = this.refs.video;

    video.addEventListener('loadedmetadata', () => {
      var ratio = video.videoWidth / video.videoHeight;
      var w = video.videoWidth - 100;
      var h = parseInt(w / ratio, 10);
      this.setState({
        width: w,
        height: h,
      });
    }, false);
  }

  screenshot(ctx) {
    ctx.fillRect(0, 0, this.state.width, this.state.height);
    ctx.drawImage(this.refs.video, 0, 0, this.state.width, this.state.height);
  }

  metadata() {
    /*
      {return} metadata about the video
      i.e. {title: '', tagline: ''}
    */
  }

  content() {
    return (
      <div>
        <h1 styles={[styles.title]}>{this.props.metadata.title}</h1>
        <h4 styles={[styles.tagline]}>{this.props.metadata.tagline}</h4>
      </div>
    );
  }

  render() {
    return (
      <div>
        <video ref="video">

        </video>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto, sans-serif',
  },
  tagline: {
    color: palette.accent2Color,
  },
});