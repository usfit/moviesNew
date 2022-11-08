import React, { Component } from 'react';
import { Image } from 'antd';

import Spinner from '../Spinner';

class ImageLoading extends Component {
  state = {
    loadingImage: true,
  };

  componentDidMount() {
    const { imagePath } = this.props;
    this.onLoadImage(imagePath);
  }

  async onLoadImage(url) {
    const res = await fetch(url, {
      method: 'GET',
    });
    if (res.ok) {
      this.setState(() => {
        return {
          loadingImage: false,
        };
      });
    }
  }

  render() {
    const { imagePath } = this.props;
    const { loadingImage } = this.state;
    const renderImage = loadingImage ? <Spinner /> : <Image src={imagePath} />;
    return renderImage;
  }
}

export default ImageLoading;
