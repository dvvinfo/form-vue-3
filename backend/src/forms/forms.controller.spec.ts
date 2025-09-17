import { Test, TestingModule } from '@nestjs/testing';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { FormADto } from './dto/form-a.dto';
import { FormBDto } from './dto/form-b.dto';

describe('FormsController', () => {
  let controller: FormsController;
  let service: FormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsController],
      providers: [
        {
          provide: FormsService,
          useValue: {
            submitFormA: jest.fn(),
            submitFormB: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FormsController>(FormsController);
    service = module.get<FormsService>(FormsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('submitFormA', () => {
    it('should call forms service submitFormA method', () => {
      const formAData: FormADto = {
        name: 'John Doe',
        email: 'john@example.com',
        inn: '1234567890',
        phone: '+79998887766',
      };

      controller.submitFormA(formAData);
      expect(service.submitFormA).toHaveBeenCalledWith(formAData);
    });
  });

  describe('submitFormB', () => {
    it('should call forms service submitFormB method', () => {
      const formBData: FormBDto = {
        name: 'John',
        surname: 'Doe',
        patronymic: 'Smith',
        birthDate: '1990-01-01',
        login: 'john_doe',
        email: 'john@example.com',
      };

      controller.submitFormB(formBData);
      expect(service.submitFormB).toHaveBeenCalledWith(formBData);
    });
  });
});