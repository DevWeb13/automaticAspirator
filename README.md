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

## Documentation

[Documentation](https://devweb13.github.io/automaticAspirator/)

## Dependencies

The project uses the following dependencies :

- **browserify** : Browserify is a tool that lets you bundle JavaScript files and their dependencies into a single file for use in a browser. It enables CommonJS modules to be used in the browser..

- **fancy-log** : Fancy-log is a logging utility that improves the display of log messages in the console. It provides additional features such as coloring and improved formatting of messages.

- **gulp** : Gulp is a JavaScript task builder. It facilitates the automation of various development tasks, such as file compilation, resource minification, file generation and so on.

- **gulp-clean-css** : Gulp-clean-css is a Gulp plugin for compressing and minimizing CSS files. It reduces the size of CSS files by removing empty spaces and comments and optimizing syntax.

- **gulp-typescript** : Gulp-typescript is a Gulp plugin for compiling TypeScript files into JavaScript. It supports the compilation of TypeScript files and offers various configuration options for the compilation process.

- **tsify** : Tsify is a plugin for Browserify that compiles TypeScript files into JavaScript during the bundling process with Browserify. It supports the continuous compilation of TypeScript files and their seamless integration into the final bundle.

- **typescript** : Typescript is a programming language that is a superset of JavaScript. It adds static typing capabilities to JavaScript and facilitates the development of large-scale JavaScript applications. This dependency installs the TypeScript compiler.

- **vinyl-source-stream** :  Vinyl-source-stream is an adapter that transforms Browserify file streams into Gulp-compatible file streams. It is used to integrate Browserify-generated files into Gulp tasks.

- **watchify** : Watchify is a Browserify extension that monitors changes to source files and automatically regenerates the bundle when modifications are detected. This enables a more efficient development process by avoiding the need to manually regenerate the bundle each time a change is made.

## 🔗 Links
[![CodinGame](https://i.ibb.co/xSnNqcZ/La-Reponse-Dev-Logo150-150.png)](https://www.lareponsedev.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/loic-g-76968b219/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/DeveloppementW1)
[![CodinGame](https://img.shields.io/static/v1?style=for-the-badge&message=CodinGame&color=222222&logo=CodinGame&logoColor=F2BB13&label=)](https://www.codingame.com/profile/4f9df2adc1f95abbab8380d47656ade10865463)

## 🛠 Skills
Javascript, React, Qwik...
