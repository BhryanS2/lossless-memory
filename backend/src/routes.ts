import { Router } from "express";
import { CreateChallengeController } from "./controllers/challenge/createChallengeController";
import { GetChallengeController } from "./controllers/challenge/getChallengeController";

import { DeleteManyDbController } from "./controllers/deleteManyDbController";

import { GetProfileController } from "./controllers/profile/getProfileController";
import { UpdateProfileController } from "./controllers/profile/updateProfileController";

import { getUsersControllers } from "./controllers/user/getUsers";
import { DeleteController } from "./controllers/user/deleteController";
import { LoginController } from "./controllers/user/loginController";
import { LogoutController } from "./controllers/user/logoutController";
import { SignupController } from "./controllers/user/signupController";
import { UpdateController } from "./controllers/user/updateController";

import { ensureAuthenticated } from "./middleware/ensureAuthenticate";

const router = Router();
router.post("/user/signup", new SignupController().handle);
router.post("/user/login", new LoginController().handle);
router.post(
  "/user/signout",
  ensureAuthenticated,
  new LogoutController().handle
);
router.delete("/user", ensureAuthenticated, new DeleteController().handle);
router.put("/user", ensureAuthenticated, new UpdateController().handle);
router.get("/users", new getUsersControllers().handle);
router.delete(
  "/delete",
  ensureAuthenticated,
  new DeleteManyDbController().clear
);

// profile
router.put(
  "/user/profile",
  ensureAuthenticated,
  new UpdateProfileController().handle
);
router.get(
  "/user/profile",
  ensureAuthenticated,
  new GetProfileController().handle
);

// challenges
router.get("/challenges", new GetChallengeController().handle);
router.post("/challenges", new CreateChallengeController().handle);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

export { router };
