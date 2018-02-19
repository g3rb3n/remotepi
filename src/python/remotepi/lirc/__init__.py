import subprocess
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class Lirc:
    """
    Parses the lircd.conf file and can send remote commands through irsend.
    """
    codes = {}

    def __init__(self, config_filename):
        self.config_filename = config_filename
        self.parse()

    def devices(self):
        """
        Return a list of devices.
        """
        return self.codes.keys()

    def device_keys(self):
        devices = {}
        for device in self.codes.keys():
            devices[device] = self.codes[device].keys()
        return devices

    def parse(self):
        """
        Parse the lircd.conf config file and create a dictionary.
        """
        config_file = open(self.config_filename, "r")

        remote_name = None
        code_section = False

        for line in config_file:
            # Convert tabs to spaces
            l = line.replace('\t',' ')
            #logger.debug(l)

            # Look for a 'begin remote' line
            if l.strip()=='begin remote':
                #logger.debug('begin remote')

                # Got the start of a remote definition
                remote_name = None
                code_section = False

            elif not remote_name and l.strip().find('name')>-1:
                # Got the name of the remote
                remote_name = l.strip().split(' ')[-1]
                if remote_name not in self.codes:
                    self.codes[remote_name] = {}

            elif remote_name and l.strip()=='end remote':
                # Got to the end of a remote definition
                remote_name = None

            elif remote_name and l.strip()=='begin codes':
                code_section = True

            elif remote_name and l.strip()=='end codes':
                code_section = False

            elif remote_name and code_section:
                # Got a code key/value pair... probably
                fields = l.strip().split(' ')
                self.codes[remote_name][fields[0]] = fields[-1]
        config_file.close()

    def call(self, cmd):
        logger.info(' '.join(cmd))
        p = subprocess.Popen(
            cmd,
            stdout = subprocess.PIPE,
            stderr = subprocess.PIPE
            )
        out,err = p.communicate()
        msg = str(err)
        logger.info(msg)
        if len(msg) > 0:
            return {'error':{'message':err}}
        return out

    def once(self, device_id, message):
        """
        Send single call to IR LED.
        """
        return self.call(['irsend', 'SEND_ONCE', device_id, message])

    def start(self, device_id, message):
        """
        Send start call to IR LED.
        """
        return self.call(['irsend', 'SEND_START', device_id, message])

    def stop(self, device_id, message):
        """
        Send stop call to IR LED.
        """
        return self.call(['irsend', 'SEND_STOP', device_id, message])


if __name__ == "__main__":
    lirc = Lirc('/etc/lirc/lircd.conf')
