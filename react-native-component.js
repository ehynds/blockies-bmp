// Usage:
//   npm install blockies-identicon
//   const Blockies = require("blockies-bmp/react-native-component");
//   <Blockies opts={{seed: "foo"}}/>

import blockies from './blockies';
import { Image } from 'react-native';

const BlockiesIdenticon = (props) => {
  const { opts, size = 48, style, ...otherprops } = props;

  const url = blockies.createDataURL({
    seed: opts.seed,
    color: opts.color,
    bgcolor: opts.bgcolor,
    spotcolor: opts.spotcolor,
  });
  return <Image
    source={{uri: url}}
    style={style || {width: size, height: size}}
    {...otherprops}
  />;
};

export default BlockiesIdenticon;
