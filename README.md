## Krnl
Hacking tool for collecting victims and running commands onto their devices.

## Installation
Considering this uses [NodeJS](https://nodejs.org/en/download/) the installation should be very easy
```
git clone https://github.com/Pixel702/Krnl
cd Krnl
npm install
```

## Server
The server offers both GUI and CLI

#### GUI:
```
npm run gui
```

The right hand side shows the list of connected rats
click one to select them and with the extensions currently
loaded are the actions you can run on the rat (Built-In extension is Calculator for Windows)

#### CLI:
```
npm run cli
```

To check all possible commands run 
```
help
```

### Client
The client only offers a js file that can be created with CLI
running:
```
dump
```

the dump creates a `client.js` that the victim then needs to run.

run that file whilst the server is running and the rat will be
connected.

### ENV
`HOST` is the Server's IP
`PORT` is the port that the client will recieve commands to
and this doesn't affect the server just client side.

### Todo:
- Settings in GUI/CLI
- Live shell in GUI/CLI