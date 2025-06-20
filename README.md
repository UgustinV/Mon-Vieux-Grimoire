# Projet Mon Vieux Grimoire

## Problématique
Il est question ici d'implémenter le backend du site Mon Vieux Grimoire.
Ce site répertorie des livre publiés par les utilisateurs pouvant être notés par d'autres.
Pour publier/noter un livre, un utilisateur doit posséder un compte.

## Mise en place

### Les routes
En accord avec le cahier des charges, 9 routes ont été créées :
- Connexion
- Création de compte
- Récupérer les livres
- Récupérer un livre
- Publier un livre
- Modifier un livre
- Supprimer un livre
- Noter un livre
- Récupérer les 3 livres les mieux notés

### Les modèles
Un modèle User ainsi qu'un modèle Book ont été créés respectant également le cahier des charges.
Chaque objet livre contient un User (la personne ayant publié le livre)

## Installation et lancement

### Installation
Pour lancer le projet, vous pouvez télécharger le repo ou le cloner avec la commande bash suivante :
```
git clone https://github.com/UgustinV/Mon-Vieux-Grimoire.git
```
Ensuite, rendez vous dans le dossier créé sur bash.
Installez npm s'il ne l'est pas déjà : https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
Lancez la commande suivante dans le dossier /frontend (répétez l'opération dans le dossier /backend) :
```
npm install
```

### Lancement
Pour lancer la version locale du site, exécutez d'abord cette commande dans /backend :
```
nodemon server
```
Puis lancez le frontend, ouvrez un nouveau terminal et dans /frontend, lancez cette commande :
```
npm start
```

Notez que vous devrez également avoir accès au variables d'environnement pour le bon fonctionnement du site