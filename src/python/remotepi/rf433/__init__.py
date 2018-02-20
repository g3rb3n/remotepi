import subprocess
import json
import logging
import time
import threading

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class RF433:

    lock = threading.Lock()
    pin = 3
    protocol = 7
    repeat = 10

    def __init__(self, conf):
        with open(conf, 'r') as f:
            self.config = json.load(f)

    def devices(self):
        return self.config['devices'].keys()

    def device_keys(self):
        devices = {}
        for device in self.config['devices']:
            devices[device] = self.config['devices'][device]['keys'].keys()
        return devices

    def command(self, device, key):
        return str(self.config['devices'][device]['keys'][key])

    def call(self, cmd):
        cmd = [str(e) for e in cmd]
        with self.lock:
            logger.info(' '.join(cmd))
            p = subprocess.Popen(
                cmd,
                stdout = subprocess.PIPE,
                stderr = subprocess.PIPE
            )
            out_pipe,err_pipe = p.communicate()
            out = str(out_pipe)
            err = str(err_pipe)
            logger.info(out)
            logger.info(err)
            if len(err) > 0:
                return {'error':{'message':err}}
            return out

    def once(self, dev, cmd):
        return self.call(['RCSend', self.pin, self.protocol, self.repeat, self.command(dev, cmd)])

    def start(self, dev, cmd):
        return self.call(['RCSend', self.pin, self.protocol, self.repeat * 3, self.command(dev, cmd)])

    def stop(self, device_id, command):
        return


if __name__ == "__main__":
    rf433 = RF433('/etc/rf433/rf433.json')
