import { Entity, Column, ObjectID, PrimaryColumn } from 'typeorm';

// @Entity()
export class Post {
  @PrimaryColumn()
  '_id': string;

  @PrimaryColumn()
  ref: string;

  @Column()
  field: string;

  @Column()
  kind: string;
}
