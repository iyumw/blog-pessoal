import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_postagens'}) //cria tabela
export class Postagem {

    @ApiProperty()
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE" //sempre q um tema for deletado, 
        // as postagens desse tema também serão deletadas
        //configurado sempre do lado N da relação
    })
    tema: Tema //foreign key

    @ApiProperty()
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE" 
    })
    usuario: Usuario

    @ApiProperty()
    @PrimaryGeneratedColumn() //auto_increment pk
    id: number;

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim()) //Tira os espaços em branco no começo e no fim da string
    @IsNotEmpty() //validação dos dados do objeto; retorna bad request se tiver vazio
    @Column({length: 100, nullable: false})  //varchar(100) not null
    titulo: string;

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    conteudo: string;

    @ApiProperty()
    @UpdateDateColumn()
    data: Date;

}