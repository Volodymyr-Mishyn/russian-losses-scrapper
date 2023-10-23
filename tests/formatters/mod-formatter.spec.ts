import { MODFormatter } from 'src/formatters/mod-formatter';
import { MODScrapResult } from 'src/models/scrap-results/mod-scrap-result';
import * as dateModule from 'src/_helpers/date';

describe('MODFormatter', () => {
  let toISOStringMock: any;
  beforeEach(() => {
    toISOStringMock = jest.spyOn(dateModule, 'toISOString');
    toISOStringMock.mockImplementation((date: string) => date);
  });
  afterEach(() => {
    toISOStringMock.mockRestore();
  });
  describe('format', () => {
    it('should format the scrapped data into JSON', async () => {
      const scrappedData: MODScrapResult = [
        {
          date: '01.01.2023',
          casualties: ['Tanks — 5000 (+10)', 'Planes — 200 (+3)'],
        },
        {
          date: '02.01.2023',
          casualties: ['Personnel — 300000 (+1000)', 'Helicopters — 200 (+2)'],
        },
      ];
      const expectedFormattedData = JSON.stringify([
        {
          date: '01.01.2023',
          casualties: [
            { name: 'Tanks', total: 5000, increment: 10 },
            { name: 'Planes', total: 200, increment: 3 },
          ],
        },
        {
          date: '02.01.2023',
          casualties: [
            { name: 'Personnel', total: 300000, increment: 1000 },
            { name: 'Helicopters', total: 200, increment: 2 },
          ],
        },
      ]);
      const formatter = new MODFormatter(scrappedData);
      const formattedData = await formatter.format();
      expect(formattedData).toBe(expectedFormattedData);
    });
  });
});
