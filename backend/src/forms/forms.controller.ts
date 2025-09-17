import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormADto } from './dto/form-a.dto';
import { FormBDto } from './dto/form-b.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('a')
  @UsePipes(new ValidationPipe({ transform: true }))
  submitFormA(@Body() formAData: FormADto) {
    return this.formsService.submitFormA(formAData);
  }

  @Post('b')
  @UsePipes(new ValidationPipe({ transform: true }))
  submitFormB(@Body() formBData: FormBDto) {
    return this.formsService.submitFormB(formBData);
  }
}