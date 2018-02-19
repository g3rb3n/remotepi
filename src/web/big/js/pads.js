var pads = {
    navigate:{
        fa: 'arrows-alt',
        keys:[
            [menu, null, back],
            [null, up, null],
            [left, ok, right],
            [null, down, null]
        ]
    },
    power:{
        fa: 'power-off',
        keys:[
            [power, eject, mute],
            [channelUp, tv, volumeUp],
            [channelDown, radio, volumeDown],
            [redDot, greenDot, yellowDot, blueDot]
        ]
    },
    play:{
        fa: 'play',
        keys:[
            [backward, play, forward],
            [stepBackward, pause, stepForward],
            [fastBackward, stop, fastForward],
            [null, null, null],
        ]
    },
    numeric:{
        fa: 'th',
        keys:[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            [null, '0', null],
        ]
    },
    amplifier:{
        fa: 'volume-up',
        keys:[
            [mapped('VIDEO', 'tv'), mapped('TUNER', 'tuner')],
            [mapped('PHONO', 'phono'), mapped('TAPE1', 'bluetooth')],
            [mapped('TAPE2', 'nc'), mapped('CD', 'nc')],
            [mapped('CDDIRECT', 'nc'), null],
        ]
    },
    lights1:{
        fa: 'lightbulb',
        keys:[
            [a1_on, a1_off],
            [a2_on, a2_off],
            [a3_on, a3_off],
            [b1_on, b1_off],
        ]
    },
    metapower: {
        fa: 'power-off',
        keys:[
            [
                fa('KEY_POWER','power-off',null,'Sony_KDL37EX500'),
                fa('KEY_POWER','power-off',null,'JVC_AXR337')
            ],[
                fa('KEY_POWER','power-off',null,'Arris_VIP2952V2'),
                fa('KEY_POWER','power-off',null,'Sony_DVPNS36')
            ],
            [],
            []
        ]
    },
    empty:{
        fa: 'circle',
        keys:[
            [],
            [],
            [],
            [],
        ]
    }
}
