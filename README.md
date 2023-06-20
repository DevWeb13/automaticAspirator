# Technical Test - Full Stack Developer

This project involves developing an application to control an automatic vacuum cleaner. The vacuum cleaner is placed in a room represented by a rectangular grid, and it can move within this grid by following a sequence of instructions.

## Application Features

The application should provide the following functionalities:

- Set the dimensions of the grid, i.e., the number of squares on the x and y axes.
- Position the vacuum cleaner initially by specifying its coordinates (x, y) and orientation.
- Execute a list of instructions to control the vacuum cleaner. The available instructions are as follows:
    - "D": Rotate the vacuum cleaner 90 degrees to the right without moving.
    - "G": Rotate the vacuum cleaner 90 degrees to the left without moving.
    - "A": Move the vacuum cleaner one step in the direction it is facing, without changing its orientation.
- Display the final position of the vacuum cleaner (coordinates and orientation) after executing the instructions.

## Example Test

To illustrate the functioning of the application, here's an example test:

- Grid dimensions: x=10, y=10
- Initial position of the vacuum cleaner: x=5, y=5, orientation=N
- Instructions: DADADADAA

Based on these parameters, we expect the final position to be: x=5, y=6, orientation=N

## Language and Deliverables

The programming language to use for this project is one of the following: Java, Kotlin, Scala, or Typescript. The deliverable should include all the necessary source code and simple documentation to run the application. The documentation can consist of a main class or unit tests. You are also free to use third-party libraries or frameworks, if needed.

Feel free to adapt the code and architecture of the application to allow easy scalability based on new constraints that may be communicated during the interview.

**Note:**

This project was completed as part of a technical test for a Full Stack Developer position.

# automaticAspirator
## Install

* You have to clone the project locally with either/or :

```bash
# HTTPS
git clone https://github.com/DevWeb13/automaticAspirator.git
# SSH
git clone git@github.com:DevWeb13/automaticAspirator.git
```

* Install dépendencies

```bash
npm install
```

* Start

```bash
npm start
```

## Dependencies

Le projet utilise les dépendances suivantes :

- **browserify** : Browserify est un outil qui permet de regrouper les fichiers JavaScript et leurs dépendances en un seul fichier pour les utiliser dans un navigateur. Il permet d'utiliser les modules CommonJS dans le navigateur.

- **fancy-log** : Fancy-log est un utilitaire de journalisation (logging) qui améliore l'affichage des messages de journalisation dans la console. Il fournit des fonctionnalités supplémentaires telles que la coloration et la mise en forme améliorée des messages.

- **gulp** : Gulp est un système de construction de tâches en JavaScript. Il facilite l'automatisation de diverses tâches de développement, telles que la compilation de fichiers, la minification des ressources, la génération de fichiers, etc.

- **gulp-clean-css** : Gulp-clean-css est un plugin Gulp qui permet de compresser et de minifier les fichiers CSS. Il réduit la taille des fichiers CSS en supprimant les espaces vides, les commentaires et en optimisant la syntaxe.

- **gulp-typescript** : Gulp-typescript est un plugin Gulp pour compiler les fichiers TypeScript en JavaScript. Il prend en charge la compilation des fichiers TypeScript et offre diverses options de configuration pour le processus de compilation.

- **tsify** : Tsify est un plugin pour Browserify qui permet de compiler les fichiers TypeScript en JavaScript lors du processus de regroupement avec Browserify. Il prend en charge la compilation en continu des fichiers TypeScript et leur intégration transparente dans le bundle final.

- **typescript** : Typescript est un langage de programmation qui est un sur-ensemble de JavaScript. Il permet d'ajouter des fonctionnalités de typage statique au JavaScript et facilite le développement d'applications JavaScript de grande envergure. Cette dépendance installe le compilateur TypeScript.

- **vinyl-source-stream** : Vinyl-source-stream est un adaptateur qui permet de transformer les flux de fichiers de Browserify en flux de fichiers compatibles avec Gulp. Il est utilisé pour intégrer les fichiers générés par Browserify dans les tâches Gulp.

- **watchify** : Watchify est une extension de Browserify qui surveille les modifications des fichiers sources et regénère automatiquement le bundle lorsque des modifications sont détectées. Cela permet un processus de développement plus efficace en évitant de regénérer manuellement le bundle à chaque modification.
