var API = (function () {

    var url = '/remotepi/api/1'

    var remotes = function(cb, eh){
        $.ajax({
            url : url + '/remotes',
            success: cb,
            error: eh
        });
    };

    var keys = function(cb, eh){
        $.ajax({
            url : url + '/keys',
            success: cb,
            error: eh
        });
    };

    var remote = function(endpoint, device, command, cb, eh, context){
        $.ajax({
            url : url + '/' + endpoint + '/' + device + '/' + command,
            success: function(data){cb(data, context)},
            error: function(e){console.log(e);eh(e, context)}
        });
    };

    var clicked = function(device, command, cb, eh){
        remote('clicked', device, command, cb, eh, context);
    };

    var once = function(device, command, cb, eh, context){
        remote('once', device, command, cb, eh, context);
    };

    var start = function(device, command, cb, eh, context){
        remote('start', device, command, cb, eh, context);
    };

    var stop = function(device, command, cb, eh, context){
        remote('stop', device, command, cb, eh, context);
    };

    return {
        clicked: clicked,
        once: once,
        start: start,
        stop: stop,
        remotes: remotes,
        keys: keys
    }
})();
