var randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values
var SIZE = 8;
var SCALE = 6;
var WIDTH = SIZE * SCALE;

function seedrand(seed) {
  for (var i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (var i = 0; i < seed.length; i++) {
    randseed[i%4] = ((randseed[i%4] << 5) - randseed[i%4]) + seed.charCodeAt(i);
  }
}

function rand() {
  // based on Java's String.hashCode(), expanded to 4 32bit values
  var t = randseed[0] ^ (randseed[0] << 11);

  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = (randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8));

  return (randseed[3]>>>0) / ((1 << 31)>>>0);
}
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function createColor() {
  //saturation is the whole color spectrum
  var h = rand();
  //saturation goes from 40 to 100, it avoids greyish colors
  var s = ((rand() * 60) + 40);
  //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
  var l = ((rand()+rand()+rand()+rand()) * 25);

  var color = hslToRgb(h, s/100, l/100);
  return color;
}
function createImageData(size) {
  var width = size; // Only support square icons for now
  var height = size;

  var dataWidth = Math.ceil(width / 2);
  var mirrorWidth = width - dataWidth;

  var data = [];
  for(var y = 0; y < height; y++) {
    var row = [];
    for(var x = 0; x < dataWidth; x++) {
      // this makes foreground and background color to have a 43% (1/2.3) probability
      // spot color has 13% chance
      row[x] = Math.floor(rand()*2.3);
    }
    var r = row.slice(0, mirrorWidth);
    r.reverse();
    row = row.concat(r);

    for(var i = 0; i < row.length; i++) {
      data.push(row[i]);
    }
  }

  return data;
}

function buildOpts(opts) {
  var newOpts = {};

  newOpts.seed = opts.seed || Math.floor((Math.random()*Math.pow(10,16))).toString(16);

  seedrand(newOpts.seed);

  newOpts.size = SIZE;
  newOpts.scale = SCALE;
  newOpts.color = opts.color || createColor();
  newOpts.bgcolor = opts.bgcolor || createColor();
  newOpts.spotcolor = opts.spotcolor || createColor();

  return newOpts;
}

function createIcon(optsParam) {
  var opts = buildOpts(optsParam || {});
  var data = createImageData(SIZE);

  var outBuf = Buffer.alloc(WIDTH * WIDTH * 3);
  var colors = [opts.bgcolor, opts.color, opts.spotcolor];
  for (var i = 0, len = data.length; i < len; i++) {
    var color = colors[data[i]];
    var row = Math.floor(i/SIZE);
    var col = i % SIZE;
    for (var x = col * SCALE; x < (col + 1) * SCALE; x++) {
      for (var y = row * SCALE; y < (row + 1) * SCALE; y++) {
        var bo = ((WIDTH - 1 - y)*WIDTH + x)*3;
        outBuf[bo + 0] = color[2]; //B
        outBuf[bo + 1] = color[1]; //G
        outBuf[bo + 2] = color[0]; //R
      }
    }
  }
  return outBuf;
}

function createIconAsDataURL (opts) {
  var header = "data:image/bmp;base64,Qk02GwAAAAAAADYAAAAoAAAAMAAAADAAAAABABgAAAAAAAAbAAATCwAAEwsAAAAAAAAAAAAA";
  return header + createIcon(opts).toString('base64');
}

module.exports = {
  createDataURL: createIconAsDataURL
};
