import { DefaultFormatter } from 'src/formatters/default-formatter';

describe('DefaultFormatter', () => {
  describe('format', () => {
    it('should format the data into JSON', async () => {
      const data = 'test';
      const formatter = new DefaultFormatter(data);
      const formattedData = await formatter.format();
      const expectedFormattedData = JSON.stringify(data);
      expect(formattedData).toBe(expectedFormattedData);
    });
  });
});
