# PREREQUIS BACKEND
## Installation et configuration de MySQL

Pour installer et configurer MySQL en local sous Linux : [Cliquez ici](https://freemedforms.com/fr/manuals/freemedforms/install/server_mysql)

Les étapes pour installer MySQL en local sous Windows :

* Télécharger sur [Cliquez ici](https://dev.mysql.com/downloads/installer/)
* Installer sous le type Developer Default
* Mettre root comme mot de passe
* Garder les autres valeurs par défaut

Les étapes pour créer la base de données "turgaldb" :

* Vérifier en utilisant MySQL Notifier que le serveur MySQL80 tourne
* Lancer le terminal mysqlsh.exe qui se trouve dans le dossier "MySQL Shell 8.0\bin"
* Taper la commande \sql
* Taper la commande \connect root@localhost
* Taper le mot de passe de root
* Taper la commande create database turgaldb;
* Taper la commande show databases; pour vérifier la création de la base de données

# PREREQUIS FRONTEND

## Installation Node.js et npm

Angular a besoin de Node.js version 10.9.0 ou plus.

-   pour vérifier la version, executer `node -v` dans un terminal/console windows.

 -   Pour installer Node.js, voir le site nodejs.org.

 -  Pour vérifier la version de npm, executer `npm -v`
 - npm est installer par defaut avec Node.js

## Installation Angular CLI

- executer `npm install -g @angular/cli` dans un terminal/consonle windows.

## Lancer l'application front
- aller dans le repértoire frontend/turing-gallery/
- executer la commande `ng serve --open`
