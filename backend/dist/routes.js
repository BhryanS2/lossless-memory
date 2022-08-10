"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const createChallengeController_1 = require("./controllers/challenge/createChallengeController");
const getChallengeController_1 = require("./controllers/challenge/getChallengeController");
const deleteManyDbController_1 = require("./controllers/deleteManyDbController");
const getProfileController_1 = require("./controllers/profile/getProfileController");
const updateProfileController_1 = require("./controllers/profile/updateProfileController");
const getUsers_1 = require("./controllers/user/getUsers");
const deleteController_1 = require("./controllers/user/deleteController");
const loginController_1 = require("./controllers/user/loginController");
const logoutController_1 = require("./controllers/user/logoutController");
const signupController_1 = require("./controllers/user/signupController");
const updateController_1 = require("./controllers/user/updateController");
const ensureAuthenticate_1 = require("./middleware/ensureAuthenticate");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/user/signup", new signupController_1.SignupController().handle);
router.post("/user/login", new loginController_1.LoginController().handle);
router.post("/user/signout", ensureAuthenticate_1.ensureAuthenticated, new logoutController_1.LogoutController().handle);
router.delete("/user", ensureAuthenticate_1.ensureAuthenticated, new deleteController_1.DeleteController().handle);
router.put("/user", ensureAuthenticate_1.ensureAuthenticated, new updateController_1.UpdateController().handle);
router.get("/users", new getUsers_1.getUsersControllers().handle);
router.delete("/delete", ensureAuthenticate_1.ensureAuthenticated, new deleteManyDbController_1.DeleteManyDbController().clear);
// profile
router.put("/user/profile", ensureAuthenticate_1.ensureAuthenticated, new updateProfileController_1.UpdateProfileController().handle);
router.get("/user/profile", ensureAuthenticate_1.ensureAuthenticated, new getProfileController_1.GetProfileController().handle);
// challenges
router.get("/challenges", new getChallengeController_1.GetChallengeController().handle);
router.post("/challenges", new createChallengeController_1.CreateChallengeController().handle);
router.get("/", (req, res) => {
    res.send("Hello World!");
});
