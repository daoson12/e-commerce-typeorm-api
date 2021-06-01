import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";




@Entity( "tbl_cart")
export class Cart{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column("double", { name: "quanlity", default:0 })
    quatity:number

    @Column("double", { name: "Price", default:0 })
    price:number

    @Column("double", { name: "totalQty", default:0 })
    totalQty:number

    @Column("double", { name: "totalCost", default:0 })
    totalCost:number


    @Column()
    productId:number
    @ManyToOne (()=>Product, product => product.cart,{eager:true})
    @JoinColumn({name:"productId"})
    product:Product;

    @Column()
    ownerId:number
    @ManyToOne (()=>User, user => user.cart,{eager:true})
    @JoinColumn({name:"ownerId"})
    user:User;    
}
