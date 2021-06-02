import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";




@Entity( "tbl_cart")
export class Cart{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column("double", { name: "quanlity", default:0 })
    quanlity:number;

    @Column("double", { name: "price", default:0 })
    price:number;

    @Column("double", { name: "totalCost", default:0 })
    totalCost:number;


    @Column()
    productId:number
    @ManyToOne (()=>Product, product => product.cart,{eager:true})
    @JoinColumn({name:"productId"})
    product:Product;

    @Column()
    userId:number
    @ManyToOne (()=>User, user => user.cart,{eager:true})
    @JoinColumn({name:"userId"})
    user:User; 
    
    @Column()
    @CreateDateColumn()
    createAt:Date

    @Column()
    @UpdateDateColumn()
    updateAt:Date
}
