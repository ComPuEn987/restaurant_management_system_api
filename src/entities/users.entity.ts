import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  user_id: number;

  @Column({ name: 'user_fullname', length: 50, nullable: true })
  @ApiProperty()
  user_fullname: string;

  @Column({ name: 'username', length: 20, nullable: false })
  @ApiProperty()
  username: string;

  @Column({ name: 'userpassword', length: 150, nullable: false })
  @ApiProperty()
  userpassword: string;

  @Column({ name: 'user_role', nullable: false })
  @ApiProperty()
  user_role: number;

  @Column({ name: 'user_status', nullable: false })
  @ApiProperty()
  user_status: boolean;

  @Column({ name: 'create_date', nullable: false })
  @ApiProperty()
  create_date: Date;

  @Column({ name: 'create_by', nullable: false })
  @ApiProperty()
  create_by: number;

  @Column({ name: 'update_date', nullable: true })
  @ApiProperty()
  update_date: Date;

  @Column({ name: 'update_by', nullable: true })
  @ApiProperty()
  update_by: number;
}
