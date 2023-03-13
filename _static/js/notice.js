const h1Element = document.querySelector("h1");

if (h1Element) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("admonition", "important");
  const textNode = document.createTextNode("This documentation site is for Controller version 6.9 and earlier. For the latest documentation, please visit: docs.aviatrix.com.");
  newDiv.appendChild(textNode);
  h1Element.parentNode.insertBefore(newDiv, h1Element);
} else {
  console.log("No <h1> elements found on the page.");
}

