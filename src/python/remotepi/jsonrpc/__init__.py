import subprocess
import logging
import json
import requests
from flask import stream_with_context

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class JsonRpc:

    def __init__(self, config_filename):
        with open(config_filename, 'r') as f:
            self.config = json.load(f)

    def devices(self):
        return self.config['devices'].keys()

    def device_keys(self):
        devices = {}
        for device in self.config['devices']:
            devices[device] = self.config['devices'][device]['commands'].keys()
        return devices

    def call(self, device, key):
        server = self.config['devices'][device]['server']
        username = self.config['devices'][device]['username']
        password = self.config['devices'][device]['password']
        command = self.config['devices'][device]['commands'][key]
        #data = {'id':1,'jsonrpc':'2.0','method':command, 'params':{'playerid':1}}
        data = {'id':1,'jsonrpc':'2.0','method':command, 'params':{}}
        params = {'request':json.dumps(data)}
        #url = 'http://' + username + ':' + password + '@' + server + '/jsonrpc'
        url = 'http://' + server + '/jsonrpc'
        req = requests.get(url, params=params, auth=(username, password))
        logger.info(req)
        res = req.json()
        logger.info(res)
        return res
        #req = requests.get(url, stream = True)
        #return stream_with_context(req.iter_content())

    def once(self, device, key):
        return self.call(device, key)

    def start(self, device, key):
        return self.call(device, key)

    def stop(self, device, key):
        return

if __name__ == "__main__":
    jsonrpc = JsonRpc('/etc/jsonrpc/jsonrpc.json')
