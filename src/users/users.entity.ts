import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users-permissions_user')
export class Users {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  password?: string;

  @Column()
  email: string;
}
