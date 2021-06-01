import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import {Request, Response } from 'express';
import { validate } from 'class-validator';
const bcrypt = require('bcryptjs'); //use to hash passwords
const jwt = require('jsonwebtoken'); //use to create, verify, and decode tokens
const secret = require('../config/clientSecret').secret; //contains secret key used to sign tokens

export const signIn = async (
    req: Request,
    res: Response

): Promise<Response> => {
    const searchedUser = await getRepository(User).findOne({
        where: [
            { username: req.body.username },
            { email: req.body.username }
        ]
    });

    // const userByIdOrEmail = await getRepository(User).findOne(req.params.id);
    if (searchedUser) {
        var passwordIsValid = bcrypt.compareSync(req.body.password, searchedUser.password);
        if (!passwordIsValid) return res.status(200).send({ success: false, auth: false, message: "Invalid Password", token: null })

        let token = jwt.sign({ id: req.body.username }, secret, {
            expiresIn: 1200 // expires in 20 minutes
        })

        //send json to the user if successful
        return res.status(200).send({ success: true, token: token, message: "User Authenticated Successfully!", user: searchedUser });
    }
    else {
        return res.status(200).send({ success: false, auth: false, message: "Invalid username or Password", token: null })
    }
}
export const changePassword = async (req: Request, res: Response):Promise<Response> => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.id;
  
    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }
  
    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }
  
    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }
  
    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);
  
    res.status(204).send();
  };
