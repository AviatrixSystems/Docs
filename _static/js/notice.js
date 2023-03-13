const h1Element = document.querySelector("h1");

const newParagraph = document.createElement("p");
const textNode = document.createTextNode("This documentation site is for Controller version 6.9 and earlier. For the latest documentation, please visit: docs.aviatrix.com.");
newParagraph.appendChild(textNode);
newParagraph.classList.add("admonition", "important");
h1Element.parentNode.insertBefore(newParagraph, h1Element);
