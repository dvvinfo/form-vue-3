import { Injectable } from '@nestjs/common';
import { FormADto } from './dto/form-a.dto';
import { FormBDto } from './dto/form-b.dto';
import { SubmissionsService } from '../submissions/submissions.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormsService {
  constructor(private readonly submissionsService: SubmissionsService) {}

  submitFormA(formAData: FormADto): any {
    // Генерируем requestId и classifier
    const requestId = uuidv4();
    const classifier = 'form-a-classifier';
    
    // Сохраняем данные формы
    this.submissionsService.saveSubmission('A', formAData, requestId, classifier);
    
    // Возвращаем правильный формат ответа
    return { 
      requestId,
      classifier
    };
  }

  submitFormB(formBData: FormBDto): any {
    // Генерируем requestId и classifier
    const requestId = uuidv4();
    const classifier = 'form-b-classifier';
    
    // Сохраняем данные формы
    this.submissionsService.saveSubmission('B', formBData, requestId, classifier);
    
    // Возвращаем правильный формат ответа
    return { 
      requestId,
      classifier
    };
  }
}