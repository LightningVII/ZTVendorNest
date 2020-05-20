import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class UploadFile {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column((type) => Post)
  related: Post[];
}
