import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]> {
        return this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem> {

        //Faz a pesquisa, se não encontrado retorna nulo. Guarda o resultado da pesquisa na const
        // SELECT * FROM postagem WHERE id = x
        const postagem = await this.postagemRepository.findOne({
            where: { id },
        })
        
        if(!postagem)
            throw new HttpException(`Postagem com id ${id} não encontrada.`, HttpStatus.NOT_FOUND);
        
        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return this.postagemRepository.find({
            where: { titulo: ILike(`%${titulo}%`)} //insensitive like
        });
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        // Verifica se a postagem existe antes de atualizar
        await this.findById(postagem.id);
        
        // Atualiza os dados da postagem
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)

        return this.postagemRepository.delete(id)
    }
}