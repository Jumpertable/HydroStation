import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index') // This should match index.hbs, index.ejs, or index.pug
  root() {
    return { message: 'Welcome to HydroStation!' };
  }
}
