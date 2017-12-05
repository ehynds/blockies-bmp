// Usage:
//   npm install blockies-identicon
//   const Blockies = require("blockies-bmp/react-component");
//   <Blockies opts={{seed: "foo"}}/>

var blockies = require("./blockies");

class BlockiesIdenticon extends React.Component {
  getUrl () {
    return blockies.createDataURL({
      seed: this.props.opts.seed,
      color: this.props.opts.color,
      bgcolor: this.props.opts.bgcolor,
      spotcolor: this.props.opts.spotcolor
    });
  }
  render() {
    return React.createElement("img", {src: this.getUrl()});
  }
}

module.exports = BlockiesIdenticon;
