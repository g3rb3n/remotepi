import sys
import os
import os.path
import logging
import logging.config
import codecs
import json
import urllib
from flask import Flask, Response, request
from flask_cors import CORS, cross_origin
import requests

import remotepi.lirc
import remotepi.rf433
import remotepi.jsonrpc
from remotepi.json_response import json_response

logging.basicConfig( \
    stream=sys.stderr, \
    level=logging.DEBUG, \
    format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s.%(funcName)s %(message)s', \
    datefmt="%Y-%m-%dT%H:%M:%S" \
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

app = Flask(__name__)

CORS(app)

app.config.update(dict(
    LIRC_CONF='/etc/lirc/lircd.conf',
    RF433_CONF='/etc/rf433/rf433.json',
    jsonrpc='/etc/jsonrpc/jsonrpc.json'
))
'''
app.config.update(dict(
    LIRC_CONF='src/etc/lirc/lircd.conf',
    RF433_CONF='src/etc/rf433/rf433.json'
))
'''

lirc = remotepi.lirc.Lirc(app.config['LIRC_CONF'])
rf433 = remotepi.rf433.RF433(app.config['RF433_CONF'])
jsonrpc = remotepi.jsonrpc.JsonRpc(app.config['jsonrpc'])


@app.errorhandler(500)
def internal_server_error(e):
    message = str(e)
    logger.error('server caught 500 %s' % message)
    logger.exception(e)
    return Response(
        json.dumps({'error': {'message':message, 'code': 500, 'type': str(type(e))}}),
        mimetype='application/json'
    ),500


@app.errorhandler(404)
def not_found_error(e):
    message = str(e)
    logger.error('server caught 404 %s' % message)
    logger.exception(e)
    return Response(
        json.dumps({'error': {'message':message, 'code': 404, 'type': 'NotFound'}}),
        mimetype='application/json'
    ),404


@app.route('/api/1/devices')
@json_response
def devices():
    devices = []
    devices.extend(lirc.devices())
    devices.extend(rf433.devices())
    devices.extend(jsonrpc.devices())
    return devices


@app.route('/api/1/keys')
@json_response
def keys():
    devices = {}
    devices.update(lirc.device_keys())
    devices.update(rf433.device_keys())
    devices.update(jsonrpc.device_keys())
    return devices


@app.route('/api/1/once/<device>/<command>', methods=['GET'])
@json_response
def once(device, command):
    try:
        if device in rf433.devices():
            return rf433.once(device, command)
        if device in jsonrpc.devices():
            return jsonrpc.once(device, command)
        if device in lirc.devices():
            return lirc.once(device, command)
        raise Exception('Unknown device %s' % device)
    except Exception as e:
        return internal_server_error(e)


@app.route('/api/1/start/<device>/<command>', methods=['GET'])
@json_response
def start(device, command):
    try:
        if device in rf433.devices():
            return rf433.start(device, command)
        if device in jsonrpc.devices():
            return jsonrpc.start(device, command)
        if device in lirc.devices():
            return lirc.start(device, command)
        raise Exception('Unknown device %s' % device)
    except Exception as e:
        return internal_server_error(e)


@app.route('/api/1/stop/<device>/<command>', methods=['GET'])
@json_response
def stop(device, command):
    try:
        if device in rf433.devices():
            return rf433.stop(device, command)
        if device in jsonrpc.devices():
            return jsonrpc.stop(device, command)
        if device in lirc.devices():
            return lirc.stop(device, command)
        raise Exception('Unknown device %s' % device)
    except Exception as e:
        return internal_server_error(e)


if __name__ == '__main__':
    '''
    Start the server
    '''
    logger.info('server started')
    app.run(host='0.0.0.0', port=8001, debug=False, use_debugger=False, use_reloader=False, threaded=True)
