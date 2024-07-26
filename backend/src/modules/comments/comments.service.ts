import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { PostCommentInput } from './dto/post-comment-input';
import { PostEntity } from '../posts/entities/post.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>

  ) {}


  /**
   * Consigue post segun el ID
   * @param id
   * @returns el post
   */
  async findById(id: string): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id },
        relations: ['user', 'post'],
      });
      return comment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Crea un nuevo post
   * @param data
   * @returns información sobre el request
   */
  async postComment(data: PostCommentInput, user: UserEntity) {
    try {
      const post = await this.postRepository.findOne({
        where: { id: data.postId },
      });
      console.log(user);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      if (!post) {
        throw new Error('post no encontrado');
      }
      const comment = this.commentRepository.create({
        text: data.text,
        date_posted: new Date(),
        user: user,
        post: post,
      });

      const savedComment = await this.commentRepository.save(comment);

      this.logger.log(`post: ${JSON.stringify(comment)}`);
      return {
        comment: savedComment,
        message: 'Creado con exito',
        code: 200,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
