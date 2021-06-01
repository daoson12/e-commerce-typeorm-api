import { Product } from './Product';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique} from "typeorm";

@Entity( "tbl_category")
@Unique(['name'])
export class Category{

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{name:"name", length:225})
    name:string;

    @Column()
    @CreateDateColumn()
    createAt:Date

    @OneToMany(()=> Product, product=> product.category)
    product:Product[];


    @Column()
    @UpdateDateColumn()
    updateAt:Date
}