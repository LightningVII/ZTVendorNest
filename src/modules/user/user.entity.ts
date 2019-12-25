import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users-permissions_user')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;
}
