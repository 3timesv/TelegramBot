import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
      // const user = req.user;
      console.log('Callback route reached.');
      console.log('User data:', req.user);
       req.session.user = req.user;
       res.redirect('/admin'); // Redirect to the admin panel after successful login
  }
}

