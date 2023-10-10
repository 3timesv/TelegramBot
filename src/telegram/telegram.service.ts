import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

const TelegramBot = require('node-telegram-bot-api');
const TELEGRAM_TOKEN = ''; // Replace with your actual bot token
const OWM_API_KEY = ''; // Replace with your OpenWeatherMap API key

@Injectable()
export class TelegramService {
  private readonly bot: any;
  private logger = new Logger(TelegramService.name);

  // Map to store subscribed users and their details
  private subscribedUsers = new Map<number, { name: string, username: string }>();

  constructor() {
    this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
    this.bot.on('message', this.onReceiveMessage);
  }

  onReceiveMessage = async (msg: any) => {
    this.logger.debug(msg);
    const chatId = msg.chat.id;
    const userId = msg.from.id; // User's ID
    const name = msg.from.first_name;
    const username = msg.from.username;

    // Check if the user is subscribed
    if (this.subscribedUsers.has(userId)) {
      if (msg.text === '/unsubscribe') {
        // User unsubscribes
        this.subscribedUsers.delete(userId);
        this.sendUnsubscribeMessage(chatId);
      } else {
        // User is subscribed; fetch and send weather data
        this.sendWeatherData(chatId);
      }
    } else {
      if (msg.text === '/subscribe') {
        // User subscribes
        this.subscribedUsers.set(userId, { name, username });
        this.sendWelcomeMessage(chatId);
      } else {
        // User is not subscribed; send instructions
        this.sendInstructions(chatId);
      }
    }
  };

  sendWelcomeMessage = (userId: string) => {
    // Send a welcome message with "Subscribe" button
    this.bot.sendMessage(userId, 'Welcome! You are now subscribed. Type /unsubscribe to unsubscribe.');
  };

  sendUnsubscribeMessage = (userId: string) => {
    // Send an unsubscribe confirmation message
    this.bot.sendMessage(userId, 'You are unsubscribed. Type /subscribe to subscribe again.');
  };

  sendInstructions = (userId: string) => {
    // Send instructions on how to subscribe
    this.bot.sendMessage(userId, 'You are not subscribed. Type /subscribe to subscribe.');
  };

  sendWeatherData = async (chatId: string) => {
    // Fetch weather data for a fixed location (e.g., 'London' for testing)
    const userLocation = 'London';

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${OWM_API_KEY}`
      );

      if (weatherResponse.status === 200) {
        const weatherData = weatherResponse.data;
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;

        // Send the weather details to the user
        this.bot.sendMessage(chatId, `Today's weather in ${userLocation}:\nTemperature: ${temperature}°C\nDescription: ${description}`);
      } else {
        // Handle the case where the weather data could not be fetched
        this.bot.sendMessage(chatId, 'Failed to fetch weather data. Please try again later.');
      }
    } catch (error) {
      // Handle any errors that occurred during the API request
      this.bot.sendMessage(chatId, 'An error occurred while fetching weather data. Please try again later.');
    }
  };

  getSubscribedUsernames(): string[] {
      const usernames: string[] = [];

      for (const [, user] of this.subscribedUsers.entries()) {
          usernames.push(user.username);
      }

      return usernames;

  }
}

