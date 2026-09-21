import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async checkDatabase(): Promise<{ ok: boolean; userCount: number }> {
    const users = await this.prisma.db.orm.public.User.all();
    return { ok: true, userCount: users.length };
  }
}
