export const db = {
  orm: {
    public: {
      User: {
        all: jest.fn().mockResolvedValue([]),
      },
    },
  },
};
