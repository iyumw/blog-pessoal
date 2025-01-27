import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_temas'})
export class Tema {

    @ApiProperty()
    @OneToMany((/* tema se relaciona com */) => Postagem /* entidade */, (postagem) /* objeto */ => postagem.tema)
    postagem: Postagem[] //Cria um array de objetos postagem pra visualizar, pq um tema pode ter 1 ou mais postagens

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim()) 
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string;
}