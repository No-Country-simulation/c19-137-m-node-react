import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post-input';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    //@InjectRepository(UserEntity)
    //private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Consigue todos los posts
   */
  async findAll(): Promise<PostEntity[]> {
    try {
      const posts = await this.postRepository.find({
        relations: ['user', 'comments', 'comments.user'],
      });
      console.log('posts', posts);
      return posts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Consigue post segun el ID
   * @param id
   * @returns el post
   */
  async findById(id: string): Promise<PostEntity> {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: ['user', 'commments', 'comments.user'],
      });
      console.log('post', post);
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Crea un nuevo post
   * @param data
   * @param user
   * @returns información sobre el request
   */
  async createPost(data: CreatePostInput, user: UserEntity) {
    try {
      this.logger.log(`createPostInput: ${JSON.stringify(data)}`);
      const post = this.postRepository.create({
        title: data.title,
        content: data.content,
        created_at: new Date(),
        user: user,
      });

      const savedPost = await this.postRepository.save(post);

      this.logger.log(`post: ${JSON.stringify(post)}`);
      return {
        post: savedPost,
        message: 'Creado con exito',
        code: 200,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
