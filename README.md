
## Metronome

A friendlier front-end to requestAnimationFrame-based animations.

## Documentation

This library provides two main methods for animation via requestAnimationFrame: a frame based
method, and a duratino based method.

### Frame based

A frame based animation specifies an explicit number of frames that the animation should take.  The animation will use exactly that amount of frames, regardless of the specific framerate that the browser is currently running. 

Advantages of this method include a visually smoother animation, as essentially no frames are "skipped".

### Duration based

A duration based animation specifies an exact amount of time (in milliseconds) that the animation should take.  In this scenario, regardless of the framerate of the browser, the animation will conclude in an exact amount of time.

Advantages of this method include a chronologically more predictive process, essentially "skipping" frames in order to finish the animation in the time specified.  This is important if time based animations are chained together, or if the *quickness* of the animation is more important than the smoothness of an animation (such as a lightning bolt flash, for example).

#### Usage

```javascript
var path = fetchPreparedSVGPath();
var length = path.getTotalLength();

path.style.strokeDasharray = length + ' ' + length;
path.style.strokeDashoffset = length;

// frame based animation
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

// duration based animation
Metronome({
  type: 'duration',
  duration: 3000,
  easing: 'easeInOutQuad',
  draw: function(handle, progress) {
    path.style.strokeDashoffset = Math.floor(length * (1 - progress));
  },
  complete: function() {
    alert('Jerbs done');
  }
});


```

#### Easing

This includes includes several basic easing equations.  Please see the source for the complete list of easing methods.

#### ``draw()`` and ``complete()``

``draw()`` is the main draw action that is called during the animation loop.  All side-effects of the animation shoudl be done in this method. 

The ``handle`` parameter is simply the requestAnimationFrame handle that JavaScript provides.  Using the handle, code inside ``draw()`` could optionally break out of the animation loop early.  

The ``progress`` paramter is a decimal percentage of the progress of the animation, starting from 0 and continuing to 1. In a frame based animation, progress percentage increases linearly.  In a duration based animation, there is no guarantee of linear progression, are momentary freezes or fps slowdowns may cause ``progress` to jump in order to catch up to where the progression should be given elapsed time and desired duration.

#### Options

- ``type``: one of ``frame`` or ``duration``
- ``draw``: callback that fires with each requestAnimationFrame call
- ``complete``: calback that fires after the completion of the animation
- ``easing``: one of the easing methods.  Default is 'easeInOutQuad'. See source for more easing options.

Dependent on ``type``:

- ``frames``: the number of frames the animation should run in a ``frame`` type animation
- ``duration``: the total amount, in milliseconds, that the animation should run in a ``duration`` type animation

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
