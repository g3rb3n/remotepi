
var fa = function(key, fa, style, device){
    var command = key;
    if (!fa){
        fa = key;
        command = 'KEY_' + key.toUpperCase();
    }
    return {
        fa: fa,
        command: command,
        style: style,
        device: device
    }
}

var mapped = function(key, str){
    return {
        text: str,
        command: key
    }
}

var play = fa('play');
var pause = fa('pause');
var stop = fa('stop');
var record = fa('record');
var backward = fa('KEY_REWIND', 'backward');
var forward = fa('KEY_FASTFORWARD', 'forward');
var stepBackward = fa('KEY_BACKWARD', 'step-backward');
var stepForward = fa('KEY_FORWARD', 'step-forward');
var fastBackward = fa('KEY_PREVIOUS', 'fast-backward');
var fastForward = fa('KEY_NEXT', 'fast-forward');

var up = fa('KEY_UP', 'chevron-up');
var down = fa('KEY_DOWN', 'chevron-down');
var left = fa('KEY_LEFT', 'chevron-left');
var right = fa('KEY_RIGHT', 'chevron-right');
var ok = fa('KEY_OK', 'check');
var menu = fa('KEY_MENU', 'bars');
var back = fa('KEY_BACK', 'undo');
var home = fa('KEY_HOME', 'home');
var osd = fa('KEY_OSD', 'bars');

var power = fa('KEY_POWER', 'power-off');
var eject = fa('KEY_EJECTCD', 'eject');
var mute = fa('KEY_MUTE', 'volume-off');
var volumeUp = fa('KEY_VOLUMEUP', 'volume-up');
var volumeDown = fa('KEY_VOLUMEDOWN', 'volume-down');
var channelUp = fa('KEY_CHANNELUP', 'plus');
var channelDown = fa('KEY_CHANNELDOWN', 'minus');
var redDot = fa('KEY_RED', 'circle', {'color':'red'});
var greenDot = fa('KEY_GREEN', 'circle', {'color':'green'});
var yellowDot = fa('KEY_YELLOW', 'circle', {'color':'yellow'});
var blueDot = fa('KEY_BLUE', 'circle', {'color':'blue'});

var guide = fa('KEY_EPG', 'newspaper');
var tv = fa('KEY_TV', 'tv');
var radio = fa('KEY_RADIO', 'music');
var goin = fa('GOIN', 'bars');
var list = fa('LIST', 'bars');

var a1_on = fa('a1on', 'toggle-on', null, 'InterTechno');
var a1_off = fa('a1off', 'toggle-off', null, 'InterTechno');
var a2_on = fa('a2on', 'toggle-on', null, 'InterTechno');
var a2_off = fa('a2off', 'toggle-off', null, 'InterTechno');
var a3_on = fa('a3on', 'toggle-on', null, 'InterTechno');
var a3_off = fa('a3off', 'toggle-off', null, 'InterTechno');
var b1_on = fa('b1on', 'toggle-on', null, 'InterTechno');
var b1_off = fa('b1off', 'toggle-off', null, 'InterTechno');
var b2_on = fa('b2on', 'toggle-on', null, 'InterTechno');
var b2_off = fa('b2off', 'toggle-off', null, 'InterTechno');
var b3_on = fa('b3on', 'toggle-on', null, 'InterTechno');
var b3_off = fa('b3off', 'toggle-off', null, 'InterTechno');
