import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { hello } from '@papillote/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return hello();
  }
}
