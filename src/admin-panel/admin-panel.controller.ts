import { Controller, Get, Render, Req } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';


@Controller('admin')
export class AdminPanelController {
    constructor(private readonly telegramService: TelegramService) {}

    @Get()
    @Render('admin-panel')
    async getAdminPanel(@Req() req) {
        const user = req.session.user;
        const subscribedUsernames = this.telegramService.getSubscribedUsernames();
        return { user, subscribedUsernames };
        return { user };
    }
}
