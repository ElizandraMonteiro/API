require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");

const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require('express');
const routes = require("./routes")

const app = express();
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

migrationsRun();

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });

});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Sever is running on Port ${PORT}`));