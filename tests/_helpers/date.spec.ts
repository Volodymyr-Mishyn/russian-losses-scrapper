import { toISOString } from 'src/_helpers/date';

describe('date', () => {
  describe('toISOString', () => {
    describe('when provided date string is valid', () => {
      const ukrainianDateString = '25.12.2023';
      it('should return valid ISO string', () => {
        const ISOString = toISOString(ukrainianDateString);
        expect(ISOString).toEqual('2023-12-25T00:00:00.000Z');
      });
    });
    describe('when provided date is not valid', () => {
      it('should return null for an empty input', () => {
        const ukrainianDateString = '';
        const result = toISOString(ukrainianDateString);
        expect(result).toBeNull();
      });

      it('should return null for a non-date input', () => {
        const ukrainianDateString = 'This is not a date';
        const result = toISOString(ukrainianDateString);
        expect(result).toBeNull();
      });
    });
  });
});
