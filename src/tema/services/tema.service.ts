import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemaService {
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ){}

    async findAll(): Promise<Tema[]> {
        return this.temaRepository.find({
            relations: {postagem: true}
        });
    }

    async findById(id: number): Promise<Tema> {
        const tema = await this.temaRepository.findOne({
            where: { id },
            relations: {postagem: true} 
            //Além de exibir os objetos de tema, também exibe os objetos de postagem associados a tema
            //Faz o INNER JOIN
        });
            
        if(!tema)
            throw new HttpException(`Tema com id ${id} não encontrado.`, HttpStatus.NOT_FOUND);
            
        return tema;
    }   
    
    async findByDescricao(descricao: string): Promise<Tema[]> {
        return await this.temaRepository.find({
            where: {descricao: ILike(`%${descricao}%`)},
            relations: {postagem: true}
        })
    }

    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema);
    }
    
    async update(tema: Tema): Promise<Tema> {
        // Verifica se a postagem existe antes de atualizar
        await this.findById(tema.id);
            
        // Atualiza os dados da postagem
        return await this.temaRepository.save(tema);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
    
        return this.temaRepository.delete(id)
    }
}