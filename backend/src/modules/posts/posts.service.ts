
import {
    BadRequestException,
    Injectable,
    Logger
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CreatePostInput } from "./dto/create-post-input";
import { User } from "../users/entities/user.entity";



@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);


    private readonly logger = new Logger(PostsService.name);

    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }
    /**
     * Consigue todos los posts
     */
    async findAll(): Promise<Post[]> {
        try {
            const posts = await this.postRepository.find({relations: ['user']});
            console.log("posts", posts);
            return posts;
        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }
  }


    /**
     * Consigue post segun el ID
     * @param id 
     * @returns el post
     */
    async findById(id: string): Promise<Post> {
        try {
            const post = await this.postRepository.findOne(
                {
                    where: {id},
                    relations: ['user']
                }
            );
            console.log("post", post)
            return post
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    /**
     * Crea un nuevo post
     * @param data 
     * @returns información sobre el request
     */
    async createPost(data: CreatePostInput) {
        try {
            this.logger.log(`createPostInput: ${JSON.stringify(data)}`);
            const user = await this.userRepository.findOne({
                where: {id : data.userId}
            })
            console.log(user)
            if (!user) {
                throw new Error("Usuario no encontrado")
            }
            const post = await this.postRepository.create({ 
                title: data.title, 
                content: data.content, 
                created_at: new Date(), 
                user: user});


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
