import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: 'tb_temas'})
export class Tema {

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[] //Cria um array de objetos postagem, que recebe os dados das postagens associadas a cada objeto de tema

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) 
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string;
}