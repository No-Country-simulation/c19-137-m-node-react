import { CreateFeedInput } from './create-feed.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFeedInput extends PartialType(CreateFeedInput) {
  id: number;
}
