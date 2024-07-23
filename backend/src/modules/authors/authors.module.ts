import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../authors/entities/authors.entity';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([Author])],
    providers:[AuthorsService, AuthorsResolver],
    exports:[AuthorsService]
})
export class AuthorsModule {}