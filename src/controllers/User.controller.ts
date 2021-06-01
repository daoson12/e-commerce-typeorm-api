import { validate } from 'class-validator';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import {Request, Response } from 'express';
const bcrypt = require('bcryptjs'); //use to hash passwords


export const getUsers = async(req:Request, res:Response):Promise<Response>=>{
    const users=await getRepository(User).find();
    return res.status(200).send(users);
};


export const getUserById = async(req:Request, res:Response):Promise<Response>=>{
    const userById=await getRepository(User).findOne(req.body.id);
    return res.status(200).send(userById);
};



export const createUser = async (req: Request, res: Response):Promise<Response> => {
    const { username, password,address,firstName,phoneNumber, lastName, email } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.address=address
    user.firstName=firstName;
    user.lastName=lastName
    user.phoneNumber=phoneNumber
    user.email=email
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    user.hashPassword();
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('Sorry, this username already exists 😿');
      return;
    }
    res.status(201).send('User created');
  };
  
  export const updateUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;
  //Get values from the body
  const { username, password,address,firstName,phoneNumber, lastName, email } = req.body;
  //Try to find user on database
  const userRepository = getRepository(User);
  let user;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("User not found");
    return;
  }
  //Validate the new values on model
  user.username = username;
  user.password = password;
  user.address=address;
  user.firstName=firstName;
  user.lastName=lastName;
  user.phoneNumber=phoneNumber
  user.email=email
  const errors = await validate(user);
  user.hashPassword();
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  //Try to safe, if fails, that means username already in use
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
  };
// Delete User by Id
  export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(User).delete(req.params.id);
    return res.status(200).send(results);
  };
