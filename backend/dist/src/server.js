"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const Port = process.env.PORT || 8000;
app_1.serverHttp.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
    console.log(`Server is running on http://localhost:${Port}`);
});
