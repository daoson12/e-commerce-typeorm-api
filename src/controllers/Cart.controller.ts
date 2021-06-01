import { getRepository } from 'typeorm';
import { Cart } from './../entity/Cart';
import { Response, Request } from 'express';


export const getAllCarts=async(req:Request, res:Response):Promise<Response>=>{
    const carts=await getRepository(Cart).find();
    return res.json(carts);
}

export const getCartById=async(req:Request, res:Response):Promise<Response>=>{
    const results =await getRepository(Cart).findOne()
  
        if (results) {
            return res.json(results)
        }
        return res.status(404).send({ message: 'No user found with ' + req.params.id });
}

export const CreatNewCart=async (req:Request, res:Response):Promise<Response>=>{
    const newCart =await getRepository(Cart).create(req.body);
    const results = await getRepository(Cart).save(newCart);
    if (results) {
        return res.json({ Success: true, message: "Category Successfully Created!", results });
    }
    else {
        return res.json({ Success: false, message: "There was a problem" });
    }
}
export const updateCart=async(req:Request, res:Response):Promise<Response>=>{
    const cart=await getRepository(Cart).findOne(req.parms.id);
    if (cart) {
        getRepository(Cart).merge(cart, req.body);
        const results=await getRepository(Cart).save(cart);
        return res.status(200).send(results);
        
    }
    return res.status(404).send({ message: 'No user found with ' + req.params.id });
}
export const deleteCart=async(req:Request, res:Response):Promise<Response>=>{
    const results = await getRepository(Cart).delete(req.params.id);
    return res.status(200).send(results);
}

