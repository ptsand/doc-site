// Generate table of contents, without parsing the DOM, using regex to get headings (one level only)
const generateTOC = (page) => {
    let toc = "<ul>";
    // The anonymous arrow function is called for every match
    page.replace(
            /<h3[^"]+"(.+?)">([^<]+)<\/h3>/gi, (str, id, headerText) => {
                toc += "<li><a href=\"#" + id + "\">" + headerText + "</a></li>";
            }
        );
    toc += "</ul>";
    return toc;
};

export default generateTOC;