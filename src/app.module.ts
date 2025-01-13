import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_blogpessoal',
    entities: [Postagem],
    synchronize: true, //td vez que reiniciar a aplicação, se houver uma alteração na classe, os dados serão alterados
    logging: true //para mostrar as querys sendo executadas no terminal
  }),
  PostagemModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
