import { Entity, Column, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('users-permissions_user')
export class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password?: string;

  @Column()
  email: string;
}
