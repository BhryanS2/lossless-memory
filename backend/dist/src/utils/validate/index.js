"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateData = void 0;
const birthday_1 = require("./birthday");
const cpf_1 = require("./cpf");
const email_1 = require("./email");
const name_1 = require("./name");
const password_1 = require("./password");
const image_1 = require("./image");
exports.ValidateData = {
    Cpf: new cpf_1.Cpf(),
    Email: new email_1.Email(),
    Password: new password_1.Password(),
    Birthday: new birthday_1.Birthday(),
    Name: new name_1.Name(),
    Image: new image_1.Image(),
};
