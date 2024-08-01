import {Injectable} from '@nestjs/common';
import {FileUpload} from 'graphql-upload-ts';
import {MediaEntity} from '@/modules/media/entities/media.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import {extname} from 'path';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(MediaEntity)
        private mediaRepository: Repository<MediaEntity>,
    ) {
    }

    /**
     * Cargamos un archivo multimedia al servidor
     * @param file
     * @param convertToBase64
     */
    async uploadMedia(
        file: { file: FileUpload },
        convertToBase64: boolean,
    ): Promise<MediaEntity> {
        const {createReadStream, filename} = file.file;
        const hashName = crypto.randomBytes(16).toString('hex');
        const uploadPath = path.join(__dirname, '..', '..', '..', 'uploads');
        const filePath = path.join(
            uploadPath,
            hashName + '.' + this.typeMediaExtension(filename),
        );
        const base64 = '';

        // Create the uploads directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        const fileSize = await new Promise<number>((resolve, reject) => {
            let size = 0;
            createReadStream()
                .on('data', (chunk) => {
                    size += chunk.length;
                })
                .on('end', () => resolve(size))
                .on('error', reject);
        });

        await new Promise((resolve, reject) => {
            createReadStream()
                .pipe(fs.createWriteStream(filePath))
                .on('finish', resolve)
                .on('error', reject);
        });

        const media = this.mediaRepository.create({
            file_name: filename,
            hash_name: hashName + '.' + this.typeMediaExtension(filename),
            type: this.identifyFileTypeByName(filename),
            size: fileSize,
            mime_type: this.identifyMimeTypeByName(filename),
            base64: base64,
        });

        if (convertToBase64) {
            media.base64 = fs.readFileSync(filePath, {encoding: 'base64'});
        }

        return this.mediaRepository.save(media);
    }

    private typeMediaExtension(file_name: string): string {
        return file_name.split('.').pop();
    }

    private identifyFileTypeByName(fileName: string): string {
        if (!fileName) {
            return null;
        }

        const fileExtension = extname(fileName).substring(1).toLowerCase();

        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const videoExtensions = ['mp4', 'webm', 'ogg'];
        const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];

        if (imageExtensions.includes(fileExtension)) {
            return 'image';
        } else if (videoExtensions.includes(fileExtension)) {
            return 'video';
        } else if (documentExtensions.includes(fileExtension)) {
            return 'document';
        } else {
            return 'other';
        }
    }

    private identifyMimeTypeByName(fileName: string): string {
        if (!fileName) {
            return 'Desconocido';
        }

        const fileExtension = fileName.split('.').pop().toLowerCase();

        // Mapa de extensiones a tipos MIME
        const mimeTypes: { [key: string]: string } = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            bmp: 'image/bmp',
            webp: 'image/webp',
            mp4: 'video/mp4',
            webm: 'video/webm',
            ogg: 'video/ogg',
            pdf: 'application/pdf',
            doc: 'application/msword',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            xls: 'application/vnd.ms-excel',
            xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };

        return mimeTypes[fileExtension] || 'application/octet-stream';
    }

    async findMediaByIds(ids: string[]): Promise<MediaEntity[]> {
        return this.mediaRepository.find({
            where: {
                id: In(ids),
            },
        });
    }

    async findById(id: string): Promise<MediaEntity> {
        return this.mediaRepository.findOne({
            where: {id},
        });
    }
}
