import { getRepository } from 'typeorm';
import { Request,Response } from 'express';
import { Product } from './../entity/Product';

export const getAllProducts=async (req:Request, res:Response):Promise<Response>=>{
    const products = await getRepository(Product).find();
    return res.status(200).send(products);
}

export const getProductById=async(req:Request, res:Response):Promise<Response>=>{
    const productById=await getRepository(Product).findOne(req.body.id);
    return res.status(200).send(productById); 
}

export const createNewProduct=async(req:Request, res:Response):Promise<Response>=>{

    const newProduct =await getRepository(Product).create(req.body);
    const results=await getRepository(Product).save(newProduct);
    if (results) {
        return res.json({Success:true,message:"Product Successfully Created", results})
        
    }else{
        return res.json({Success:false, message:"there was a problem creating Product"})
    }
}

export const updateProduct=async(req:Request, res:Response):Promise<Response>=>{
    const product =await getRepository(Product).findOne(req.params.id);
    if (product) {
        getRepository(Product).merge(product, req.body);
        const results=await getRepository(Product).save(product);
        return res.status(200).send(results);
        
    } else {
        return res.status(404).send({message:"No product found with "+ req.params.id});
    }
}

export const deleteProduct=async(req:Request, res:Response):Promise<Response>=>{
    const results=await getRepository(Product).delete(req.params.id);
    return res.status(200).send(results);
};
