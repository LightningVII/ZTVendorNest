import { Entity, Column, ObjectID, PrimaryColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class UploadFile {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column((type) => Post)
  related: Post[];
}
