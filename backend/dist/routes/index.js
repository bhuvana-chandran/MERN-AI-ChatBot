import { Router } from "express";
import UserRouters from "./UserRouter.js";
import ChatRouters from "./ChatRouter.js";
const appRouter = Router();
appRouter.use("/user", UserRouters); // domain/api/v1/user/
appRouter.use("/chat", ChatRouters);
export default appRouter;
//# sourceMappingURL=index.js.map