import { Category } from './../entity/Category';
import { getRepository } from 'typeorm';
import {Request, Response } from 'express';


export const getCategories=async(req:Request, res:Response):Promise<Response>=>{
    const categories=await getRepository(Category).find();
    return res.json(categories);
}

export const getCategoryById=async(req:Request, res:Response):Promise<Response>=>{
    const results= await getRepository(Category).findOne();
    if (results) {
        return res.json(results)
    }
    return res.status(404).send({ message: 'No user found with ' + req.params.id });
};

export const createCategory = async (req: Request,res: Response): Promise<Response> => {
    const newCategory = await getRepository(Category).create(req.body);
    const results = await getRepository(Category).save(newCategory);
    if (results) {
        return res.json({ Success: true, message: "Category Successfully Created!", results });
    }
    else {
        return res.json({ Success: false, message: "There was a problem" });
    }
};

export const updateCategory=async(req:Request, res:Response):Promise<Response>=>{
   const category=await getRepository(Category).findOne(req.params.id);
   if (category) {
       getRepository(Category).merge(category, req.body);
       const results=await getRepository(Category).save(category);
       return res.status(200).send(results);
       
   }
   return res.status(404).send({ message: 'No user found with ' + req.params.id });
}

// Delete category by Id
export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Category).delete(req.params.id);
    return res.status(200).send(results);
};

