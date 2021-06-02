import { Product } from './../entity/Product';
import { getRepository } from 'typeorm';
import { Cart } from './../entity/Cart';
import { Response, Request } from 'express';
import { User } from '../entity/User';


export const getAllCarts = async (req: Request, res: Response): Promise<Response> => {
    const carts = await getRepository(Cart).find();
    return res.json(carts);
}

export const getCartById = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Cart).findOne()

    if (results) {
        return res.json(results)
    }
    return res.status(404).send({ message: 'No user found with ' + req.params.id });
}

export const createNewCart = async (req: Request, res: Response): Promise<Response> => {
    var qty = req.body.quanlity
    const userId = await getRepository(User).findOne(req.body.userId);
    const product = await getRepository(Product).findOne(req.body.product);
    if (product && userId) {
        var price = product.price
        var totalCost = qty * price
        const newCart = new Cart();
        newCart.quanlity = qty
        newCart.totalCost = totalCost
        newCart.product = product
        newCart.price = product.price
        newCart.user = userId
        const data = await getRepository(Cart).save(newCart);
        return res.json({ Success: true, message: "A NEW ITEM HAS BEEN ADDED", data });
    } else {
        return res.json({ Success: false, message: "proudct not found" });
    }


}


export const updateCart = async (req: Request, res: Response): Promise<Response> => {
    var qty = req.body.quanlity
    const cart = await getRepository(Cart).findOne(req.params.id);
    if (cart) {
        const userId = await getRepository(User).findOne(req.body.userId);
        const product = await getRepository(Product).findOne(req.body.product);
        if (userId && product) {
            var price = product.price
            var totalCost = qty * price
            cart.quanlity = qty
            cart.totalCost = totalCost
            cart.product = product
            cart.price = product.price
            cart.user = userId
            const data = await getRepository(Cart).save(cart);
        return res.json({ Success: true, message: "Your Cart has been Updated!", data });

        } else {
            return res.status(404).send({ message: 'User or product invalid ' });
        }

    } else {
        return res.status(404).send({ message: 'No Cart found with ' + req.params.id });
    }

}
export const deleteCart = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Cart).delete(req.params.id);
    return res.status(200).send(results);
}

