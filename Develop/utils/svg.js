function generateSvgContent(title, textColor, shape, shapeFillColor) {
  const shapeElements = shape
    .map(
      (selectedShape) =>
        `<${selectedShape} cx="50" cy="50" r="40" fill="${shapeFillColor}" />`
    )
    .join("");

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      ${shapeElements}
      <text x="50%" y="50%" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${title}</text>
    </svg>`;
  return svgContent;
}

function displaySvgLogo(logoId, svgContent) {
  const logoElement = document.getElementById(logoId);
  logoElement.innerHTML = svgContent;
}
