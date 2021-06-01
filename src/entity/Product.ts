import { Category } from './Category';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Cart } from './Cart';

@Entity( "tbl_product")
export class Product{

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{name:"productName", length:225})
    productName:string;

    @Column("varchar",{name:"descripion",})
    description:string;

    @Column("double",{name:"price"})
    price:number;

    @Column()
    imagePath: String;

    @Column()
    categoryId:number
    @ManyToOne (()=>Category, category => category.product,{eager:true})
    @JoinColumn({name:"categoryId"})
    category:Category;

    @OneToMany(()=> Cart, cart=> cart.productId)
    cart:Cart[];

    @Column()
    available:Boolean
    
    @Column()
    @CreateDateColumn()
    createAt:Date

    @Column()
    @UpdateDateColumn()
    updateAt:Date

}