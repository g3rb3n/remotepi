var Remote = (function () {

    var fixStringKeys = function(config){
        config.forEach(function (row){
//            row.forEach(function (col){
            for (var idx = 0 ; idx < row.length ; ++idx)
            {
                var col = row[idx];
                if (typeof col === "string"){
                    row[idx] = {
                        command: 'KEY_' + col.toUpperCase(),
                        text: col
                    };
                }
            }
//            });
        });
    }

    var enableKeys = function(config, device){
        config.forEach(function (row){
            row.forEach(function (col){
                var key;
                if (!col)
                    return;
                else if (typeof col === "string"){
                    key = 'KEY_' + col.toUpperCase();
                }
                else if ('fa' in col){
                    key = col.command;
                }
                else if ('text' in col){
                    key = col.command;
                }
                //console.log(key + ':' + (key in device.keys));
                //console.log(device.keys);
                col.enabled = device.keys.indexOf(key) > -1;;
            });
        });
    }

    var createPad = function(config, $target, device, deviceKey){
        fixStringKeys(config);
        if (device)
            enableKeys(config, device);
        $target.empty();
        config.forEach(function (row){
            var $row = $('<div>').appendTo($target);
            row.forEach(function (col){
                //console.log(col);
                var $span = $('<span>')
                    .appendTo($row);
                if (!col || 'enabled' in col && !col.enabled){
                    $span.attr('fill',true).appendTo($row);
                    return;
                }
                $span.addClass('button')
                    .addClass('clickable')
                    .attr('device', deviceKey);
                if ('fa' in col){
                    var $i = $('<i>')
                        .addClass('fa fa-' + col.fa)
                        .appendTo($span);
                    if (col.style)
                        $i.css(col.style);
                    $span.attr('command', col.command);
                }
                else if ('text' in col){
                    var $tag = (col.text.length > 1) ? $('<p>') : $('<b>');
                    $tag.text(col.text).appendTo($span);
                    $span.appendTo($row);
                    $span.attr('command', col.command);
                    if (col.style)
                        $i.css(col.style);
                }
                if ('device' in col)
                    $span.attr('device', col.device);
            });
        });
    }

    var createIconMenu = function(config, $target, pads, device){
        Object.keys(config).forEach(function (key){
            pad = config[key];
            if (config[key] === null)
                pad = pads[key];
            var $span = $('<span>')
                .attr('pad', key)
                .attr('device', device)
                .appendTo($target);
            var $i = $('<i>')
                .addClass('fa fa-' + pad.fa)
                .appendTo($span);
        });
        $('<span fill>').appendTo($target);
    }

    var createRemotesMenu = function(config, $target){
        Object.keys(config).forEach(function (key){
            //console.log(key);
            let remote = config[key];
            let $li = $('<li>')
                .addClass('clickable')
                .attr('device', remote.device)
                .attr('remote', key)
                .appendTo($target);
            $('<i>')
                .addClass('fa')
                .addClass('fa-' + remote.fa)
                .appendTo($li);
            $('<span>').text(remote.name)
                .appendTo($li);
        });
    }

    return {
        createPad: createPad,
        createRemotesMenu: createRemotesMenu,
        createMenu: createRemotesMenu,
        createIconMenu: createIconMenu,
        enableKeys: enableKeys
    }
})();
