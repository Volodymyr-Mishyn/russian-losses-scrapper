jest.mock('src/_helpers/logger.ts', () => {
  return {
    Logger: {
      getInstance: jest.fn().mockImplementation(() => {
        return {
          info: jest.fn(),
          error: jest.fn(),
          debug: jest.fn(),
        };
      }),
    },
  };
});
