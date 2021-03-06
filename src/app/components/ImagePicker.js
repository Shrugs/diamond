'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {
  FlatButton,
  FontIcon,
  Avatar,
  CircularProgress,
} from 'material-ui';
import { button } from './styles/base';
import { palette } from './styles/constants';

export default class ImagePicker extends React.Component {

  propTypes: {
    onImage: React.PropTypes.func,
  }

  constructor() {
    super();

    this.getImage = this.getImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.state = {imageURL: undefined, loading: false};
  }

  getImage() {
    return this.state.imageURL;
  }

  chooseImage() {
    this.setState({loading: true});
    chrome.fileSystem.chooseEntry({
      accepts:[
        {
          extensions: ['png', 'jpg', 'jpeg'],
        },
      ],
    }, (img) => {
      if (img === undefined) {
        if (this.props.onImage) {
          this.props.onImage(img);
        }
        this.setState({
          imageURL: undefined,
        });
        return;
      }
      img.file((file) => {
        var url = window.URL.createObjectURL(file);
        this.setState({
          imageURL: url,
          loading: false,
        });
        if (this.props.onImage) {
          this.props.onImage(url);
        }
      });
    });
  }

  render() {
    var r = [];
    if (this.props.children) {
      r.push(
        <FlatButton key="button" styles={[button]} onClick={this.chooseImage} primary={true}>
          {this.props.children}
        </FlatButton>
      );
    }

    if (this.state.imageURL) {
      r.push(
        <Avatar key="image" src={this.state.imageURL} styles={[styles.img]} />
      );
    } else {
      r.push(
        <Avatar
          key="placeholder"
          styles={[styles.img, styles.empty]}
          onClick={this.chooseImage}>
          {
            this.state.loading ?
            <CircularProgress innerStyle={{margin: '0'}} mode="indeterminate" size={0.5} /> :
            <FontIcon className="material-icons" color={palette.accent3Color}>add</FontIcon>
          }
        </Avatar>
      );
    }
    return (
      <div styles={[styles.container].concat(this.props.styles)}>
        {r}
      </div>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginLeft: '10px',
    marginRight: '10px',
    height: '36px',
    width: '36px',
  },
  empty: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
});
