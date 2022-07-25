"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        express_1.response.status(401).json({ message: "token invalid." });
    }
    // como o token vem no formato Bearer, precisamos separar
    const [, token] = authToken.split(" ");
    try {
        const { userId } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.userId = userId;
        return next();
    }
    catch (err) {
        express_1.response.status(401).json({ message: "token expired." });
    }
    // res.redirect("/login");
}
exports.ensureAuthenticated = ensureAuthenticated;
