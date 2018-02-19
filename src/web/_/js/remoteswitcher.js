/*
Allows switching in a map by key and by index (previous / next).
*/
var RemoteSwitcher = (function () {

    var remoteIndex = 0;

    var remoteMap;

    var remoteKeys = [];

    var onSwitch;

    var init = function(remotes, _onSwitch){
        remoteMap = remotes;
        remoteKeys = Object.keys(remotes);
        onSwitch = _onSwitch;
    }

    var next = function(){
        remoteIndex++;
        if (remoteIndex >= remoteKeys.length)
            remoteIndex = 0;
        switchTo(remoteKeys[remoteIndex]);
    }

    var previous = function(){
        remoteIndex--;
        if (remoteIndex < 0)
            remoteIndex = remoteKeys.length - 1;
        switchTo(remoteKeys[remoteIndex]);
    }

    var index = function(key){
        return remoteKeys.indexOf(key);
    }

    var switchTo = function(key){
        var remote = remoteMap[key];
        remoteIndex = index(key);
        onSwitch(remote);
    }

    return {
        switchTo: switchTo,
        previous: previous,
        next: next,
        init: init
    }
})();
