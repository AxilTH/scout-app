import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db } from '../../prisma/db';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly db = db;

  async onModuleDestroy() {
    const client = this.db as { $disconnect?: () => Promise<void> };
    if (typeof client.$disconnect === 'function') {
      await client.$disconnect();
    }
  }
}
