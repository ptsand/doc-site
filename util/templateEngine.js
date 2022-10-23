import fs from "fs";
import generateTOC from "./generateTOC.js";

const header = fs.readFileSync("./public/components/navbar/navbar.html").toString();
const leftSidebar = fs.readFileSync("./public/components/sidebars/left-sidebar.html").toString();
const pageWrapper = fs.readFileSync("./public/pages/wrapper.html").toString();
const footer = fs.readFileSync("./public/components/footer/footer.html").toString();

export function renderPage(path, options = {}) {
    let page = fs.readFileSync("./public/pages"+path).toString();
    // Generate table of contents on pages with a sidebar
    const sidebar = options.noLeftSidebar ? "" : leftSidebar.replace("%%TOC%%", generateTOC(page));
    page = pageWrapper.replace("%%PAGE%%", page); // Wrap page
    return header
        .replace("%%TAB_TITLE%%", options.tabTitle || "NodeJS")
        .replace("%%BODY_CLASS%%", sidebar ? "sidebar-page" : "full-width-page")
        + sidebar
        + page.replace("%%ERROR_MSG%%", options.errorMsg || "")
        + footer;
}


