import { Request, Response, Router } from 'express'
import auth from './auth'
import user from './userRoute'
import category from './categoryRoute'
import product from './productRoute'
import cart from './cartRoute'
const routes = Router();
routes.get('/', (req, res) =>
  res.send(
    'This is a basic Authentication using TypeScript, Node.js, TypeORM and Mysql',
  ),
)
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/category", category);
routes.use("/product", product);
routes.use("/cart", cart);

export default routes;