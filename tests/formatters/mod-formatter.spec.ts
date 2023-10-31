import { MODFormatter } from 'src/formatters/mod-formatter';
import { MODScrapResult } from 'src/models/scrap-results/mod-scrap-result';
import * as dateModule from 'src/_helpers/date';

describe('MODFormatter', () => {
  const scrappedData: MODScrapResult = [
    {
      date: '01.01.2023',
      casualties: ['Tanks — 5000 (+10)', 'Planes — 200 (+3)'],
    },
    {
      date: '02.01.2023',
      casualties: ['Personnel — aprx. 300000  people (+1000)', 'Helicopters — 200 (+2)'],
    },
  ];
  const expectedFormattedData = [
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
  ];
  let formatter: MODFormatter;
  let toISOStringMock: any;
  beforeEach(() => {
    formatter = new MODFormatter(scrappedData);
    toISOStringMock = jest.spyOn(dateModule, 'toISOString');
    toISOStringMock.mockImplementation((date: string) => date);
  });
  afterEach(() => {
    toISOStringMock.mockRestore();
  });
  describe('format', () => {
    it('should format the scrapped data into JSON string', async () => {
      const formattedData = await formatter.format();
      expect(formattedData).toBe(JSON.stringify(expectedFormattedData));
    });
  });
  describe('formatPretty', () => {
    it('should format the scrapped data into JSON string with indents', async () => {
      const formattedData = await formatter.formatPretty();
      expect(formattedData).toBe(JSON.stringify(expectedFormattedData, null, 2));
    });
  });
  describe('formatAsIs', () => {
    it('should format the scrapped data into JSON string with indents', async () => {
      const formattedData = await formatter.formatAsIs();
      expect(formattedData).toEqual(expectedFormattedData);
    });
  });
});
