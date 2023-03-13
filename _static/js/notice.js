   document.addEventListener("DOMContentLoaded", (event) => {
            const h1Element = document.querySelector("h1");
            if (h1Element) {
                var newDiv = document.createElement("div");
                newDiv.classList.add("admonition", "important");
                var firstP = document.createElement("p");
                firstP.classList.add("first", "admonition-title");
                var newSpan = document.createElement("span");
                newSpan.classList.add("highlighted");
                newSpan.innerHTML = "Important";
                firstP.appendChild(newSpan);
                var secondP = document.createElement("p");
                secondP.classList.add("last");

                secondP.innerHTML = "This documentation site is for Controller version 6.9 and earlier. For the latest documentation, please visit: <a href=\"https://docs.aviatrix.com\">docs.aviatrix.com</a>."       
                newDiv.appendChild(firstP)
                newDiv.appendChild(secondP)
                h1Element.parentNode.insertBefore(newDiv, h1Element);
            } else {
                console.error("No <h1> elements found on the page.");
            }
        });

