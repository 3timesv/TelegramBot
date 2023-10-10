
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; // Import the AuthModule
import { AuthController } from './auth/auth.controller'; // Import the AuthController
import { AdminPanelController } from './admin-panel.controller';
import { TelegramService } from '../telegram/telegram.service';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [AuthModule, TelegramModule], // Include the AuthModule in the imports array
  controllers: [AuthController, AdminPanelController], // Include the AuthController in the controllers array
  providers: [TelegramService]
})
export class AdminPanelModule {}

