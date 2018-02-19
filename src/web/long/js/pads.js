var pads = {
    'full':{
        fa: 'circle',
        keys:[
            [power, eject, mute],
            [volumeDown, volumeUp],
            [menu, up, back],
            [left,ok,right],
            [home, down, osd],
            [channelDown, channelUp],
            [redDot, greenDot, yellowDot, blueDot],
            [backward, play, forward],
            [stepBackward, pause, stepForward],
            [fastBackward, stop, fastForward],
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            [null, '0', null],
            [guide, radio, tv],
        ]
    },
    'amplifier':{
        fa: 'music',
        keys:[
            [power, eject, mute],
            [volumeDown, volumeUp],
            [],
            [mapped('VIDEO', 'tv')],
            [mapped('TUNER', 'tuner')],
            [mapped('PHONO', 'phono')],
            [mapped('TAPE1', 'bluetooth')],
            [mapped('TAPE2', 'nc')],
            [mapped('CD', 'nc')],
            [mapped('CDDIRECT', 'nc')],
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            [null, '0', null],
            [guide, radio, tv],
        ]
    },
    'lights':{
        fa: 'lightbulb',
        keys:[
            [a1_on, a1_off],
            [a2_on, a2_off],
            [a3_on, a3_off],
            [b1_on, b1_off],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ]
    }
}
