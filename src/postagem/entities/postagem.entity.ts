import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_postagens'}) //cria tabela
export class Postagem {

    @PrimaryGeneratedColumn() //auto_increment pk
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Tira os espaços em branco no começo e no fim da string
    @IsNotEmpty() //validação dos dados do objeto; retorna bad request se tiver vazio
    @Column({length: 100, nullable: false})  //varchar(100) not null
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    conteudo: string;

    @UpdateDateColumn()
    data: Date;

}