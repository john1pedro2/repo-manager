import { Router } from "express";

import auth from "./middlewares/auth";

import SessionController from "./controllers/SessionsController"
import UsersControllers from "./controllers/UsersControllers";
import RepositoriesControllers from "./controllers/RepositoriesControllers";

const routes = new Router();

routes.post("/sessions", SessionController.create)

routes.use(auth);

routes.get("/users", UsersControllers.index);
routes.get("/users/:id", UsersControllers.show);
routes.post("/users", UsersControllers.create);
routes.put("/users/:id", UsersControllers.update);
routes.delete("/users/:id", UsersControllers.destroy);

routes.get("/users/:user_id/repositories", RepositoriesControllers.index)
routes.post("/users/:user_id/repositories", RepositoriesControllers.create)
routes.delete("/users/:user_id/repositories/:id", RepositoriesControllers.destroy)

export default routes