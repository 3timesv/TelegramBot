import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@Module({
  imports: [TelegramModule, AdminPanelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
