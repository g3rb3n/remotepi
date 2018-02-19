/*
Allows switching in a map by key and by index (previous / next).
*/
var MapSwitcher = (function(){

    var index = 0;
    var map = {};
    var keys = [];
    var onSwitch;

    var init = function(_map, _onSwitch){
        map = _map;
        keys = Object.keys(_map);
        onSwitch = _onSwitch;
    }

    var next = function(){
        index++;
        if (index >= keys.length) index = 0;
        switchTo(keys[index]);
    }

    var previous = function(){
        index--;
        if (index < 0) index = keys.length - 1;
        switchTo(keys[index]);
    }

    var switchTo = function(key){
        index = keys.indexOf(key);
        onSwitch(map[key]);
    }

    return {
        switchTo: switchTo,
        previous: previous,
        next: next,
        init: init
    }
})();
