var RemoteBuilder = (function(){

    var clone = function(o){
        return $.extend(true, {}, o);
        //return JSON.parse(JSON.stringify(o));
    };

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
                if (!(remote.device in devices)){
                    throw remote.device + " not found in devices";
                }
                remote.device = devices[remote.device];
            }
            if (typeof remote.pad === "string"){
                if (!(remote.pad in pads)){
                    throw remote.pad + " not found in pads";
                }
                remote.pad = clone(pads[remote.pad]);
            }
            if ("pads" in remote){
                for (var i = 0 ; i < remote.pads.length ; ++i){
                    var pad = remote.pads[i];
                    if (typeof pad === "string"){
                        if (!(pad in pads)){
                            throw pad + " not found in pads";
                        }
                        remote.pads[i] = clone(pads[pad]);
                    }
                }
            }
        });
    };

    var resolveStringKeys = function(keys){
        keys.forEach(function(row){
            for (var idx = 0 ; idx < row.length ; ++idx){
                var col = row[idx];
                if (typeof col === "string"){
                    row[idx] = {
                        command: "KEY_" + col.toUpperCase(),
                        text: col
                    };
                }
            }
        });
    };

    var resolveFunctionKeys = function(keys, remote){
        keys.forEach(function(row){
            for (var idx = 0 ; idx < row.length ; ++idx){
                var col = row[idx];
                if (typeof col === "function"){
                    row[idx] = col(remote);
                }
            }
        });
    };

    var enableKeys = function(pad, device){
        var deviceKeys = device.keys;
        var padKeys = pad.keys;
        padKeys.forEach(function(row){
            row.forEach(function(col){
                if (!col) return;
                if (typeof col.enabledFunction === "function"){
                    col.enabled = col.enabledFunction(device);
                    return;
                }
                col.enabled = deviceKeys.indexOf(col.command) > -1;
                if (col.alwaysEnabled) col.enabled = true;
            });
        });
    };

    var createPad = function($target, remote, pad){
        console.log('createPad');
        console.log($target)
        console.log(remote)
        console.log(pad)
        $target.empty();

        if (!pad) pad = remote.pad;
        if (!pad) return;
        pad = clone(pad);
        var device = remote.device;

        resolveStringKeys(pad.keys);
        resolveFunctionKeys(pad.keys, remote);
        if (device) enableKeys(pad, device);

        pad.keys.forEach(function(row){
            var $row = $("<div>").appendTo($target);
            row.forEach(function(col){
                var $span = $("<span>")
                    .appendTo($row);
                if (!col || "enabled" in col && !col.enabled){
                    $span.attr("fill",true).appendTo($row);
                    return;
                }
                var deviceId =
                    col.device ? col.device :
                    device ? device.id : null;
                $span.addClass("button")
                    .addClass("clickable")
                    .attr("device", deviceId);
                $span.data(col);
                if ("fa" in col){
                    var $i = $("<i>")
                        .addClass("fa fa-" + col.fa)
                        .appendTo($span);
                    if (col.style)
                        $i.css(col.style);
                    $span.attr("command", col.command);
                }
                else if ("text" in col){
                    var $tag = (col.text.length > 1) ? $("<p>") : $("<b>");
                    $tag.text(col.text).appendTo($span);
                    $span.appendTo($row);
                    $span.attr("command", col.command);
                    if (col.style)
                        $tag.css(col.style);
                }
            });
        });
    };

    var createPadsMenu = function($target, remote){
        $target.empty();
        remote.pads.forEach(function(pad){
            if (!pad) return;
            var $span = $("<span>")
                .attr("pad", pad.id)
//                .attr("device", remote.device.id)
                .appendTo($target);
            var $i = $("<i>")
                .addClass("fa fa-" + pad.fa)
                .appendTo($span);
        });
    };

    var createRemotesMenu = function($target, remotes){
        $target.empty();
        Object.keys(remotes).forEach(function(key){
            var remote = remotes[key];
            var $li = $("<li>")
                .addClass("clickable")
                .attr("device", remote.device)
                .attr("remote", key)
                .appendTo($target);
            $("<i>")
                .addClass("fa")
                .addClass("fa-" + remote.fa)
                .appendTo($li);
            $("<span>").text(remote.name)
                .appendTo($li);
        });
    };

    return {
        init: init,
        createPad: createPad,
        createRemotesMenu: createRemotesMenu,
        createPadsMenu: createPadsMenu
    };
})();
