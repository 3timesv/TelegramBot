import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }), // Register Passport and set the default strategy to 'google'
  ],
  providers: [GoogleStrategy], // Register the GoogleStrategy as a provider
  exports: [PassportModule], // Export PassportModule for use in other modules
})
export class AuthModule {}

