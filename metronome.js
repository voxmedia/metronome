(function() {

  // Adapted from https://gist.github.com/paulirish/1579671 which derived from
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  // requestAnimationFrame polyfill by Erik Möller.
  // Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

  var dateNow = Date.now || function() { return new Date().getTime(); };
  
  (function() {
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                     || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var lastTime = 0;
      window.requestAnimationFrame = function(callback) {
        var now = dateNow();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
                          nextTime - now);
      };
      window.cancelAnimationFrame = clearTimeout;
    }
  }());

  // From: https://gist.github.com/gre/1650294
  var Easing = {
    // no easing, no acceleration
    linear: function (t) { return t; },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t*t; },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t*(2-t); },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t; },
    // accelerating from zero velocity
    easeInCubic: function (t) { return t*t*t; },
    // decelerating to zero velocity
    easeOutCubic: function (t) { return (--t)*t*t+1; },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },
    // accelerating from zero velocity
    easeInQuart: function (t) { return t*t*t*t; },
    // decelerating to zero velocity
    easeOutQuart: function (t) { return 1-(--t)*t*t*t; },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t; },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t; },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
  };

  var MetronomeException = function(message) {
    this.name = "MetronomeException";
    this.message = message;
  };

  var noop = function() {};

  var animate_frames = function(options) {
    var handle = 0;
    var current_frame = 0;
    var max_frame = options.frames;
    var progress = 0;
    var callback = options.draw || noop;
    var complete = options.complete || noop;
    var easing = Easing[options.easing || 'easeInOutQuad' ];
    var progress_method = function() {
      current_frame++;
      return Math.min(1, easing(current_frame/max_frame));
    };

    var draw = function() {
      var progress = progress_method();
      callback(handle, progress);
      if (progress >= 1) {
        window.cancelAnimationFrame(handle);
        if (!!complete) { complete(); }
      } else {
        handle = window.requestAnimationFrame(draw);
      }
    };
    draw();
  };

  var animate_duration = function(options) {
    var handle = 0;
    var initial_ts = dateNow();
    var progress = 0;
    var max_duration = options.duration;
    var callback = options.draw || noop;
    var complete = options.complete || noop;
    var easing = Easing[options.easing || 'easeInOutQuad'];
    var progress_method = function() {
      return Math.min(1, easing((dateNow() - initial_ts)/max_duration));
    };

    var draw = function() {
      var progress = progress_method();
      callback(handle, progress);
      if (progress >= 1) {
        window.cancelAnimationFrame(handle);
        if (!!complete) { complete(); }
      } else {
        handle = window.requestAnimationFrame(draw);
      }
    };
    draw();
  };

  var Metronome = function(options) {
    if (!options.type) {
      throw new MetronomeException("'type' is required");
      return;
    }
    if (options.type === 'frame') {
      animate_frames(options);
    }
    if (options.type === 'duration') {
      animate_duration(options);
    }
  };

  window.Metronome = Metronome;
})();
