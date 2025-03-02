import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaService } from "../tema/services/tema.service";
import { TemaModule } from "../tema/tema.module";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    controllers: [PostagemController],
    providers: [PostagemService, TemaService],
    exports: [TypeOrmModule] //pra poder acessar fora do module 
})

export class PostagemModule {}