import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

// @Entity()
export class Post {
  @ObjectIdColumn()
  '_id': ObjectID;

  @ObjectIdColumn()
  ref: ObjectID;

  @Column()
  field: string;

  @Column()
  kind: string;
}
