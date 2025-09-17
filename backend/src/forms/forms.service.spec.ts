import { Test, TestingModule } from '@nestjs/testing';
import { FormsService } from './forms.service';
import { SubmissionsService } from '../submissions/submissions.service';
import { FormADto } from './dto/form-a.dto';
import { FormBDto } from './dto/form-b.dto';

describe('FormsService', () => {
  let service: FormsService;
  let submissionsService: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormsService,
        {
          provide: SubmissionsService,
          useValue: {
            saveSubmission: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FormsService>(FormsService);
    submissionsService = module.get<SubmissionsService>(SubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submitFormA', () => {
    it('should generate requestId and classifier and save submission', () => {
      const formAData: FormADto = {
        name: 'John Doe',
        email: 'john@example.com',
        inn: '1234567890',
        phone: '+79998887766',
      };

      const result = service.submitFormA(formAData);
      
      expect(result).toHaveProperty('requestId');
      expect(result).toHaveProperty('classifier');
      expect(result.classifier).toBe('form-a-classifier');
      expect(submissionsService.saveSubmission).toHaveBeenCalledWith('A', formAData, result.requestId, result.classifier);
    });
  });

  describe('submitFormB', () => {
    it('should generate requestId and classifier and save submission', () => {
      const formBData: FormBDto = {
        name: 'John',
        surname: 'Doe',
        patronymic: 'Smith',
        birthDate: '1990-01-01',
        login: 'john_doe',
        email: 'john@example.com',
      };

      const result = service.submitFormB(formBData);
      
      expect(result).toHaveProperty('requestId');
      expect(result).toHaveProperty('classifier');
      expect(result.classifier).toBe('form-b-classifier');
      expect(submissionsService.saveSubmission).toHaveBeenCalledWith('B', formBData, result.requestId, result.classifier);
    });
  });
});