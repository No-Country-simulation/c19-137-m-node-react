import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post-input';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { MediaService } from '@/modules/media/media.service';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly mediaService: MediaService,
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
   * Crea un nuevo post en la base de datos
   * @param data
   * @param user
   * @returns información sobre el request
   */
  async createPost(
    data: CreatePostInput,
    user: UserEntity,
  ): Promise<PostEntity> {
    console.log('data', user);
    const post = this.postRepository.create({
      title: data.title,
      content: data.content,
      user: user,
    });

    // Buscar los medios por sus IDs y asignarlos al post
    if (data.mediaIds && data.mediaIds.length > 0) {
      post.media = await this.mediaService.findMediaByIds(data.mediaIds);
    }

    const savedPost = await this.postRepository.save(post);
    this.logger.log(`post: ${JSON.stringify(savedPost)}`);
    return savedPost;
  }
}
