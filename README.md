# MINI PROJET SECURITE

## Installation

### Back-end

* Lancer sur votre poste :
  * Le serveur
  * La base de données (depuis MySQL80 ou PHPMyAdmin)
* Ouvrir le contenu du dossier 'backend' à partir de Spring Boot 
* Configurer son fichier 'application.properties' :
  * Le port pour la connexion à la BDD :
    * 3303 ou 3307
  * Le port pour la connexion au backend :
    * 8080 ou 9090
  * Le login de la BDD :
    * 'root' généralement
  * Le mot de passe de la BDD :
    * 'root' ou ''
* Lancer l'application
* Passer au lancement du frontend

### Front-end

* Au préalable, lancez le backend depuis Spring Boot
* Se rendre à la racine du contenu du dossier 'frontend'
* Si vous disposez des modules 'node_modules' :
  * Tapper dans le terminal 'ng serve --open'
* Sinon :
  * Tapper dans le terminal 'npm install'

#### Nota Bene Front-end

* Il sera peut-être nécessaire selon votre version d'Angular d'installer :
  * rxjs et/ou Observable :  
    * Tapper dans le terminal 'npm install --save rxjs-compat'
* S'il manquait d'autres modules, procéder à l'installation de ceux-ci


