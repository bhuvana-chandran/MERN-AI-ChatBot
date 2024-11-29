import { Router } from "express";
import { getAllUsers, UserLogin, UserLogout, UserSignUp, VerifyUser } from "../controllers/UserControllers.js";
import { userLoginValidator, userSignupValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/jwt-token-generator.js";
const UserRouters = Router();
UserRouters.get("/getUsers", getAllUsers);
UserRouters.post("/signup", validate(userSignupValidator), UserSignUp);
UserRouters.post("/login", validate(userLoginValidator), UserLogin);
UserRouters.get("/auth-status", verifyToken, VerifyUser);
UserRouters.get("/logout", verifyToken, UserLogout);
export default UserRouters;
//# sourceMappingURL=UserRouter.js.map