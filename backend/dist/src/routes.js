"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const AdminController_1 = require("./controllers/AdminController");
const createChallengeController_1 = require("./controllers/challenge/createChallengeController");
const getChallengeController_1 = require("./controllers/challenge/getChallengeController");
const DeleteManyDbController_1 = require("./controllers/DeleteManyDbController");
const getProfileController_1 = require("./controllers/profile/getProfileController");
const updateProfileController_1 = require("./controllers/profile/updateProfileController");
const DeleteController_1 = require("./controllers/user/DeleteController");
const LoginController_1 = require("./controllers/user/LoginController");
const LogoutController_1 = require("./controllers/user/LogoutController");
const SignupController_1 = require("./controllers/user/SignupController");
const UpdateController_1 = require("./controllers/user/UpdateController");
const ensureAuthenticate_1 = require("./middleware/ensureAuthenticate");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/user/signup", new SignupController_1.SignupController().handle);
router.post("/user/login", new LoginController_1.LoginController().handle);
router.post("/user/signout", ensureAuthenticate_1.ensureAuthenticated, new LogoutController_1.LogoutController().handle);
router.delete("/user", ensureAuthenticate_1.ensureAuthenticated, new DeleteController_1.DeleteController().handle);
router.put("/user", ensureAuthenticate_1.ensureAuthenticated, new UpdateController_1.UpdateController().handle);
router.get("/users", new AdminController_1.Admin().handle);
router.delete("/delete", new DeleteManyDbController_1.DeleteManyDbController().clear);
// profile
router.put("/user/profile", ensureAuthenticate_1.ensureAuthenticated, new updateProfileController_1.UpdateProfileController().handle);
router.get("/user/profile", ensureAuthenticate_1.ensureAuthenticated, new getProfileController_1.GetProfileController().handle);
// challenges
router.get("/challenges", new getChallengeController_1.GetChallengeController().handle);
router.post("/challenges", new createChallengeController_1.CreateChallengeController().handle);
router.get("/", (req, res) => {
    res.send("Hello World!");
});
