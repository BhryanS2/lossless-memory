import { Router } from "express";
import { Admin } from "./controllers/AdminController";
import { CreateChallengeController } from "./controllers/challenge/createChallengeController";
import { GetChallengeController } from "./controllers/challenge/getChallengeController";
import { DeleteManyDbController } from "./controllers/DeleteManyDbController";
import { GetProfileController } from "./controllers/profile/getProfileController";
import { UpdateProfileController } from "./controllers/profile/updateProfileController";
import { DeleteController } from "./controllers/user/DeleteController";
import { LoginController } from "./controllers/user/LoginController";
import { LogoutController } from "./controllers/user/LogoutController";
import { SignupController } from "./controllers/user/SignupController";
import { UpdateController } from "./controllers/user/UpdateController";
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
router.get("/users", new Admin().handle);
router.delete("/delete", new DeleteManyDbController().clear);

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
