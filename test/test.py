import remotepi.lirc

def test_lirc():
    lirc = remotepi.lirc.Lirc('./src/etc/lirc/lircd.conf')
    print(lirc.devices())


if __name__ == '__main__':
    test_lirc()
