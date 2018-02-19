/*
Make a distinction between short clicks and long press.
A short click is handled as a single click.
A long press is handled as start press and stop press.
Emits three events: start, stop and once.
*/
var StartStopOnceTimer = (function(){

    var _start;
    var _stop;
    var _once;

    var _delay = 200;

    var _timer;
    var _started = false;

    var init = function(start, stop, once, delay){
        _start = start;
        _stop = stop;
        _once = once;
        if (delay) _delay = delay;
    }

    var down = function(button){
        _timer = window.setTimeout(function(){
            _started = true;
            _timer = null;
            _start(button);
        }, _delay);
    }

    var up = function(button){
        window.clearTimeout(_timer);
        if (_started){
            _stop(button);
        } else {
            _once(button);
        }
        _started = false;
        _timer = null;
    }

    return {
        init: init,
        down: down,
        up: up
    }
})();
