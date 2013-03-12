expo-player
===========

HTML5 eportfolio player

EN:
Web application following W3C standards
to share, expose, presente
artistic works, cultural projects, educational contents ...

FR:
Application web utilisant les standards du W3C
pour partager, exposer, présenter
des oeuvres artistiques, des projects culturels, des contenus pédagogiques ..

requirements
============

For a basic hosting server:

 * Web server
 * PHP5.3 or +
 * php-curl

To use the remote:

 * nodejs
 * npm (express, socket.io, log4js)

Installation
============

Go in the folder where you would like to install the application and then clone
the git repository :

```sh
git clone https://github.com/IDCI-Consulting/expo-player.git
```

Then install git submodules

```sh
git submodule init
git submodule update
```

[Install nodejs / npm](http://nodejs.org/)

Go in the `expo-player/nodejs` folder and install the needed nodejs modules:

```sh
npm install nodejs log4js express socket.io
```

/!\ Copy the expo folder into the created `node_modules` folder

```sh
cp -R expo node_modules/
```

=> TODO: add expo in [node packet manager](https://npmjs.org/)

now run the node server

```sh
nodejs remote-srv.js
```

Technology
==========

 * PHP5
 * HTML5
 * CSS3
 * Javascript (jquery, jquery mobile)
 * nodejs (express, socket.io)

Dependencies
============

 * http://imakewebthings.com/deck.js/docs/
 * http://bartaz.github.com/impress.js/
 * http://www.turnjs.com/
 * http://nodejs.org/
 * http://expressjs.com
 * http://socket.io/

