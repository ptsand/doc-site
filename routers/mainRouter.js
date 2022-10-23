import { Router, urlencoded} from "express";
import { renderPage } from "../util/templateEngine.js";

const router = Router();

const frontPage = renderPage("/frontpage/frontpage.html", 
{ 
    tabTitle: "Home",
    noLeftSidebar: true
});

const adminPage = renderPage("/admin/dashboard.html",
{
    tabTitle: "Admin dashboard",
    noLeftSidebar: true
});
const adminLoginPage = renderPage("/admin/login-form.html",
{
    tabTitle: "Login",
    noLeftSidebar: true
});
// Documentation pages with sidebar
const javascriptPage = renderPage("/docs/javascript.html", {tabTitle: "JavaScript"});
const nodejsPage = renderPage("/docs/nodejs.html", {tabTitle: "Node.js"});
const expressPage = renderPage("/docs/express.html", {tabTitle: "Express"});

router.get("/", (req, res) => {
    res.send(frontPage);
});

router.get("/docs/javascript", (req, res) => {
    res.send(javascriptPage);
});

router.get("/docs/nodejs", (req, res) => {
    res.send(nodejsPage);
});

router.get("/docs/express", (req, res) => {
    res.send(expressPage);
});
// TODO: Add middleware to redirect on invalid jwt cookie
router.get("/admin/dashboard", (req, res) => {
    res.send(adminPage);
});

router.get("/admin/login-form", (req, res) => {
    res.send(adminLoginPage);
});
// Use middleware to parse form data
router.post("/admin/authenticate", urlencoded({ extended: false }), (req, res) => {
    console.log(req.body);
    // For now, using hardcoded creds. TODO: update this
    const validCredentials = req.body.username === "admin";
    if (validCredentials) {
        // TODO: set cookie with JWT, and redirect
        // for now, just redirect the client
        res.redirect("/admin/dashboard");
    } else {
        // Render login form with error message
        res.send(renderPage("/admin/login-form.html",
        {
            tabTitle: "Login",
            noLeftSidebar: true,
            errorMsg: '<div class="alert alert-danger">Invalid credentials</div>'
        }));
    }
});

export default router;