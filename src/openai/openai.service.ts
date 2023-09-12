import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

@Injectable()
export class OpenAIService {
  private openai;

  constructor() {
    dotenv.config();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async ask(message: string): Promise<any> {
    if (!message) {
      throw new Error('Empty message from user');
    }

    try {
      const response = await this.openai.chat.completions.create({
        messages: [{ role: 'system', content: message }],
        model: 'gpt-3.5-turbo',
      });

      return response.choices[0].message;
    } catch (error) {
      throw error;
    }
  }
}
