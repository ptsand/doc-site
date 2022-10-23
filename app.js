import express from "express";
import router from "./routers/mainRouter.js";

const app = express();

app.use(express.static("public"));
app.use(router);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", server.address().port);
});