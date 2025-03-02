import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService, // Injeta o service do tema para relacionar com a postagem
    ){}

    async findAll(): Promise<Postagem[]> {
        return this.postagemRepository.find({
            relations: {tema: true, usuario: true}
        });
    }

    async findById(id: number): Promise<Postagem> {

        //Faz a pesquisa, se não encontrado retorna nulo. Guarda o resultado da pesquisa na const
        // SELECT * FROM postagem WHERE id = x
        const postagem = await this.postagemRepository.findOne({
            where: { id },
            relations: {tema: true, usuario: true}
        })
        
        if(!postagem)
            throw new HttpException(`Postagem com id ${id} não encontrada.`, HttpStatus.NOT_FOUND);
        
        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return this.postagemRepository.find({
            where: { titulo: ILike(`%${titulo}%`)}, //insensitive like
            relations: {tema: true, usuario: true}
        });
    }

    async findByUser(usuarioId: number): Promise<Postagem[]> {
        return this.postagemRepository.find({
            where: { usuario: { id: usuarioId } }, // Filtra as postagens pelo ID do usuário
            relations: { tema: true, usuario: true }, // Inclui os relacionamentos com tema e usuário
        });
    }

    async create(postagem: Postagem): Promise<Postagem> {
        // Verifica se o tema existe antes de salvar a postagem
        await this.temaService.findById(postagem.tema.id)
        
        // Salva a postagem com o relacionamento com o tema
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        // Verifica se a postagem existe antes de atualizar
        await this.findById(postagem.id);
        
        // Verifica se o tema existe antes de atualizar a postagem
        await this.temaService.findById(postagem.tema.id)
        
        // Atualiza os dados da postagem
        return await this.postagemRepository.save(postagem);

    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)

        return this.postagemRepository.delete(id)
    }
}