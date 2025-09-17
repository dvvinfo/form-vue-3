import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
  ) {}

  async saveSubmission(formType: string, formData: any, requestId?: string, classifier?: string): Promise<Submission> {
    const submission = this.submissionsRepository.create({
      formType,
      formData,
      requestId: requestId || '',
      classifier: classifier || '',
    });
    
    return this.submissionsRepository.save(submission);
  }

  async findAll(): Promise<Submission[]> {
    return this.submissionsRepository.find();
  }

  async findOne(id: number): Promise<Submission | null> {
    return this.submissionsRepository.findOne({ where: { id } });
  }
}