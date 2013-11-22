A friendlier front-end to requestAnimationFrame-based animations.

## Usage

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

## Options

``type``: one of ``frame`` or ``duration``
``draw``: callback that fires with each requestAnimationFrame call
``complete``: calback that fires after the completion of the animation

Dependent on ``type``:

``frames``: the number of frames the animation should run in a ``frame`` type animation
``duration```: the total duration the animation should run in a ``duration`` type animation
