const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter logo text up to three characters",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter hexadecimal number to choose text color",
  },
  {
    type: "checkbox",
    name: "shape",
    message: "Choose shape of logo",
    choices: ["circle", "rectangle", "triangle"],
  },
  {
    type: "input",
    name: "shapeFillColor",
    message: "Enter hexadecimal number to choose background color of shape",
  },
];

function writeToFile(fileName, data) {
  const filePath = path.join(process.cwd(), fileName);
  fs.writeFileSync(filePath, data);
  console.log(`SVG file created at ${filePath}`);
}

function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const { title, textColor, shape, shapeFillColor } = answers;

      // Generate SVG content based on user choices
      const shapeElements = shape
        .map((selectedShape) => {
          switch (selectedShape) {
            case "circle":
              return `<circle cx="50" cy="50" r="40" fill="${shapeFillColor}" />`;
            case "rectangle":
              return `<rect x="10" y="10" width="80" height="80" fill="${shapeFillColor}" />`;
            case "triangle":
              return `<polygon points="50,10 90,90 10,90" fill="${shapeFillColor}" />`;
            default:
              return "";
          }
        })
        .join("");

      const svgContent = `<svg width="100" height="100">
            ${shapeElements}
            <text x="50%" y="50%" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${title}</text>
          </svg>`;

      // Call writeToFile function with the desired file name and SVG content
      writeToFile("logo.svg", svgContent, (err) => {});
      console.log("Generated logo.svg");
    })
    .catch((error) => {
      console.error("Error occurred while initializing the app:", error);
    });
}

init();
