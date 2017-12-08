// Usage:
//   npm install blockies-identicon
//   const Blockies = require("blockies-bmp/react-native-component");
//   <Blockies opts={{seed: "foo"}}/>

import { Image } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import blockies from './blockies';

const BlockiesIdenticon = (props) => {
  const {
    opts,
    size = 48,
    style,
    ...otherprops
  } = props;

  const uri = blockies.createDataURL({
    seed: opts.seed,
    color: opts.color,
    bgcolor: opts.bgcolor,
    spotcolor: opts.spotcolor,
  });
  return (<Image
    source={{ uri }}
    style={style || { width: size, height: size }}
    {...otherprops}
  />);
};

BlockiesIdenticon.propTypes = {
  size: PropTypes.number,
  opts: PropTypes.shape({
    seed: PropTypes.string,
    color: PropTypes.string,
    bgcolor: PropTypes.string,
    spotcolor: PropTypes.string,
  }).isRequired,
  style: Image.propTypes.style,
};

BlockiesIdenticon.defaultProps = {
  size: 48,
  style: {},
};

export default BlockiesIdenticon;
