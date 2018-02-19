var RemoteBuilder = (function(){

    var mapIds = function(map){
        Object.keys(map).forEach(function(key){
            map[key].id = key;
        });
    };

    var init = function(remotes, pads, devices){
        mapIds(remotes);
        mapIds(pads);
        mapIds(devices);
        Object.keys(remotes).forEach(function(key){
            var remote = remotes[key];
            if (typeof remote.device === "string"){
                if (!(remote.device in devices))
                    throw remote.device + ' not found in devices';
                remote.device = devices[remote.device];
            }
            if (typeof remote.pad === "string"){
                if (!(remote.pad in pads))
                    throw remote.pad + ' not found in pads';
                remote.pad = pads[remote.pad];
            }
            if ('pads' in remote){
                for (var i = 0 ; i < remote.pads.length ; ++i){
                    var pad = remote.pads[i];
                    if (typeof pad === "string"){
                        if (!(pad in pads))
                            throw pad + ' not found in pads';
                        remote.pads[i] = pads[pad];
                    }
                };
            }
        });
    };

    var resolveStringKeys = function(keys){
        keys.forEach(function(row){
            for (var idx = 0 ; idx < row.length ; ++idx){
                var col = row[idx];
                if (typeof col === "string"){
                    row[idx] = {
                        command: 'KEY_' + col.toUpperCase(),
                        text: col
                    };
                }
            }
        });
    }

    var enableKeys = function(padKeys, deviceKeys){
        padKeys.forEach(function(row){
            row.forEach(function(col){
                if (!col) return;
                col.enabled = deviceKeys.indexOf(col.command) > -1;
            });
        });
    }

    var createPad = function($target, remote, pad){
        $target.empty();

        if (!pad) pad = remote.pad;
        if (!pad) return;
        var device = remote.device;

        resolveStringKeys(pad.keys);
        if (device) enableKeys(pad.keys, device.keys);

        pad.keys.forEach(function(row){
            var $row = $('<div>').appendTo($target);
            row.forEach(function(col){
                var $span = $('<span>')
                    .appendTo($row);
                if (!col || 'enabled' in col && !col.enabled){
                    $span.attr('fill',true).appendTo($row);
                    return;
                }
                var deviceId = col.device ? col.device : device.id;
                $span.addClass('button')
                    .addClass('clickable')
                    .attr('device', deviceId);
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
            });
        });
    }

    var createPadsMenu = function($target, remote){
        $target.empty();
        remote.pads.forEach(function(pad){
            if (!pad) return;
            var $span = $('<span>')
                .attr('pad', pad.id)
//                .attr('device', remote.device.id)
                .appendTo($target);
            var $i = $('<i>')
                .addClass('fa fa-' + pad.fa)
                .appendTo($span);
        });
    }

    var createRemotesMenu = function($target, remotes){
        $target.empty();
        Object.keys(remotes).forEach(function(key){
            let remote = remotes[key];
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
        init: init,
        createPad: createPad,
        createRemotesMenu: createRemotesMenu,
        createPadsMenu: createPadsMenu,
        enableKeys: enableKeys
    }
})();
