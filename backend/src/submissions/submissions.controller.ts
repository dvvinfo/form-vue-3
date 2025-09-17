import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { Submission } from './entities/submission.entity';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  findAll(): Promise<Submission[]> {
    return this.submissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Submission | null> {
    return this.submissionsService.findOne(id);
  }
}