/*
Bind buttons to API
Distinguished click and long press
*/
var APIButtons = (function(){

    var init = function($target, selector, ms){
        var down_event = ('ontouchstart' in document.documentElement)  ? 'touchstart' : 'mousedown';
        var up_event = ('ontouchend' in document.documentElement)  ? 'touchend' : 'mouseup';
        $target.on(down_event, selector, function(){ down($(this)); });
        $target.on(up_event, selector, function(){ up($(this)); });

        StartStopOnceTimer.init(
            function(button){API.start(button.attr('device'), button.attr('command'), none, err, button)},
            function(button){API.stop (button.attr('device'), button.attr('command'), done, err, button)},
            function(button){API.once (button.attr('device'), button.attr('command'), done, err, button)},
            ms
        );
    }

    var none = function(data, button){
    }

    var done = function(data, button){
        button.removeClass('pressed');
    }

    var err = function(error, button){
        button.removeClass('pressed');
        button.addClass('error');
    }

    var down = function($button){
        $button.removeClass('error');
        $button.addClass('pressed');
        var data = $button.data();
        if (data.buttons){
            data.buttons.forEach(function(button){
                API.once(button.device, button.command, done, err, $button);
            });
            return;
        }
        StartStopOnceTimer.down($button);
    }

    var up = function($button){
        var data = $button.data();
        if (data.buttons) return;
        StartStopOnceTimer.up($button);
    }
    return {
        init: init
    }
})();
