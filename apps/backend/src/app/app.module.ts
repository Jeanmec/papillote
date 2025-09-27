import { Module } from '@nestjs/common';
import { DatabaseModule } from '~/app/database/database.module';
import { AppController } from '~/app/app.controller';
import { AppService } from '~/app/app.service';
import { UserModule } from '~/app/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
