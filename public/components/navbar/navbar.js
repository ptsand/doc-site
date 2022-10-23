// Set active class on the currentpage menu item
const dataElement = document.getElementById("active-page");
anchorId = dataElement.getAttribute("data-anchor-id");
document.getElementById(anchorId).className += " active";