Blockies
========

A tiny library for generating blocky identicons in BMP.

Since the BMP format supports uncompressed pixed data, no external dependencies are needed. Can be used in node.js, the browser or react-native.

Size is hard-coded to 48x48 pixels in order to hard-code the BMP header.

![Sample blockies image](sample.png "Blockies")

Use
---

```javascript
var blockies = require('blockies-bmp')
var url = blockies.createDataURL({ // All options are optional
    seed: 'randstring', // seed used to generate icon data, default: random
    color: '#dfe', // to manually specify the icon color, default: random
    bgcolor: '#aaa', // choose a different background color, default: random
    spotcolor: '#000' // each pixel has a 13% chance of being of a third color,
    // default: random. Set to -1 to disable it. These "spots" create structures
    // that look like eyes, mouths and noses.
});

document.getElementsByTagName('img').src = url;
```
React Native
------------

```
const Blockies = require("blockies-bmp/react-native-component");
<Blockies opts={{seed: "foo"}}/>
```

React
-----

```
const Blockies = require("blockies-bmp/react-component");
<Blockies opts={{seed: "foo"}}/>
```

Build
-----

    node build
All this does is minify `blockies.js` to `blockies.min.js`.


License
-------

[WTFPL](http://www.wtfpl.net/)
