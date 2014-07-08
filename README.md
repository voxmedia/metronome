
## Metronome

A friendlier front-end to requestAnimationFrame-based animations.

## Documentation

#### Usage

```javascript
var path = fetchPreparedSVGPath();
var length = path.getTotalLength();

path.style.strokeDasharray = length + ' ' + length;
path.style.strokeDashoffset = length;

Metronome({
  type: 'frame',
  frames: 120,
  easing: 'easeInOutQuad',
  draw: function(handle, progress) {
    path.style.strokeDashoffset = Math.floor(length * (1 - progress));
  },
  complete: function() {
    alert('Jerbs done');
  }
});
```

### Options

- ``type``: one of ``frame`` or ``duration``
- ``draw``: callback that fires with each requestAnimationFrame call
- ``complete``: calback that fires after the completion of the animation
- ``easing``: one of the easing methods.  Default is 'easeInOutQuad'. See source for more easing options.

Dependent on ``type``:

- ``frames``: the number of frames the animation should run in a ``frame`` type animation
- ``duration```: the total duration the animation should run in a ``duration`` type animation

## Authors

David Zhou (dz@voxmedia.com, [@dz](http://twitter.com/dz))

## Contribute

This is an active project and we encourage contributions. [Please review our guidelines and code of conduct before contributing.](https://github.com/voxmedia/open-source-contribution-guidelines)

## License 

Copyright (c) 2014, Vox Media, Inc.
All rights reserved.

BSD license

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
