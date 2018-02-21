# RemotePi
A universal remote contol build upon the Raspberry Pi. Use your phone / tablet / computer to control your devices.

## Protocols
Supports:
- IR
- RF433
- Kodi jsonrpc

## Hardware
Any Raspberry Pi will do.
Any modern phone will do.
Raspberry Pi hat with:
- IR led
- IR receiver
- RF433 transmitter
- RF433 receiver

## Server setup
- nginx for serving the html based remote UI and for dispatching api calls.
- a small python based http service which receives commands.

## UI Design
- index.html with the basic layout
- screen.css with the styles
4 javascript files with definitions
- js/buttons.js defines the separate button
- js/pads.js defines the different pad layouts as rows of keys
- js/devices.js defines the capabilities of the devices
- js/remotes.js defines the different remotes

## UI support
Tested on:
- Firefox 58.0
- Crhome 64.0

## ToDo
- Better Lirc config parsing support, include name xxx as keys for raw encoding
- Use device definitions from server
- Use the uncommon keys that a device supports
- Support MQTT
- Find a way to easily record ir / rf codes from the ui
- ESP8266 as server
- More layout examples
