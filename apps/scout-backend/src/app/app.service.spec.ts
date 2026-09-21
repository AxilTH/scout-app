import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: {
            db: {
              orm: {
                public: {
                  User: {
                    all: jest.fn().mockResolvedValue([]),
                  },
                },
              },
            },
          },
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
