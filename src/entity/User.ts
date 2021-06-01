import { Cart } from './Cart';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany} from "typeorm";
import * as bcrypt from "bcryptjs";
@Entity( "tbl_user")
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "firstName", length: 199 })
    firstName: string;

    @Column("varchar", {name: "lastFirst", length:199})
    lastName: string;

    @Column("varchar", {name:"phoneNumber", length:11})
    phoneNumber: number;

    @Column("varchar", { name: "username" })
    username:string;

    @Column("varchar", { name: "address", nullable: true })
    address: string;
    
    @Column("varchar", { name: "email", nullable: true })
    email: string;
   
    @Column()
    password:string;

    @OneToMany(()=> Cart, cart=> cart.ownerId)
    cart:Cart[];

    @Column()
    @CreateDateColumn()
    createAt:Date

    @Column()
    @UpdateDateColumn()
    updateAt:Date

    hashPassword(){
        this.password=bcrypt.hashSync(this.password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string){
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }   
}
