import { Router } from "express";
import { Admin } from "./controllers/AdminController";
import { DeleteManyDbController } from "./controllers/DeleteManyDbController";
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

router.delete("/delete", new DeleteManyDbController().clear);
router.get("/admin", new Admin().handle);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

export { router };
