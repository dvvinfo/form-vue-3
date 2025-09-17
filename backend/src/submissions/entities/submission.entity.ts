import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestId: string;

  @Column()
  classifier: string;

  @Column()
  formType: string;

  @Column('json')
  formData: any;

  @CreateDateColumn()
  submittedAt: Date;
}