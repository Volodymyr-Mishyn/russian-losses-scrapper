import { OryxFormatter } from 'src/formatters/oryx-formatter';
import { OryxScrapResult } from 'src/models/scrap-results/oryx-scrap-result';

const resultData = {
  name: 'Russia',
  statistics: {
    count: 12656,
    destroyed: 8760,
    damaged: 524,
    abandoned: 477,
    captured: 2895,
  },
  entities: [
    {
      name: 'Tanks',
      statistics: {
        count: 2404,
        destroyed: 1571,
        damaged: 137,
        abandoned: 146,
        captured: 550,
      },
      details: [
        {
          name: 'T-72B Obr. 2022',
          count: 14,
          destroyed: {
            count: 9,
            list: [
              'https://twitter.com/UAWeapons/status/1632339858533367808',
              'https://i.postimg.cc/02cDmxgj/1016-t72b-2022-destr-01-07-23.jpg',
              'https://twitter.com/naalsio26/status/1696337466855141423',
              'https://i.postimg.cc/mrBfmjtL/1001-T-72-B-Obr-2022-destr-26-09-23.jpg',
              'https://i.postimg.cc/qBYPP4zZ/1039-t72b2022-destr-04-10-23.jpg',
              'https://i.postimg.cc/MpJhG507/1055-t72b3-obr2022-destr-03-10-23.jpg',
              'https://i.postimg.cc/65gMh8GF/3287.png',
              'https://i.postimg.cc/KvNJVmLG/1302-2x-t72b2022-destr.jpg',
            ],
          },
          damaged: {
            count: 1,
            list: ['https://i.postimg.cc/J0s6fHbS/1341-t72b-obr2022-dam-08-10-23.jpg'],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 4,
            list: [
              'https://i.postimg.cc/DwFvf0H4/1016-BREM-1-BTR-82-A-T-72-A-T-72-B3-dam-aband-08-07-23.jpg',
              'https://i.postimg.cc/cLKTshcY/1016-t72b-2022-dam-aband-14-07-23.jpg',
              'https://i.postimg.cc/K8KNkcMC/3260.png',
              'https://i.postimg.cc/cC9D67N1/1032-T-72-B-Obr-2022-dam-aband-11-10-23.jpg',
            ],
          },
        },
      ],
    },
    {
      name: 'Armoured Fighting Vehicles',
      statistics: {
        count: 1005,
        destroyed: 668,
        damaged: 29,
        abandoned: 39,
        captured: 269,
      },
      details: [
        {
          name: 'BMP-2 675-sb3KDZ',
          count: 13,
          destroyed: {
            count: 11,
            list: [
              'https://i.postimg.cc/D0NRFvR3/1004-BMP-2-675-SB3-KDZ-destr.jpg',
              'https://i.postimg.cc/gkbWtRbK/1007-BMP-2-675-sb3-KDZ-destr-27-05-23.jpg',
              'https://i.postimg.cc/L6pvZN1v/1043-BMP-2-675-sb3-KDZ-destr-08-06-23.jpg',
              'https://twitter.com/UAWeapons/status/1668515155100028929',
              'https://i.postimg.cc/d04zYVcF/1011-BMP-2-with-675-sb3-KDZ-add-on-armour-destr-29-06-23.jpg',
              'https://i.postimg.cc/g0kLXD2p/43700.png',
              'https://i.postimg.cc/5yMtsw3g/5554.png',
              'https://i.postimg.cc/tRnt6VGM/1026-2x-BMP-2-675-sb3-KDZ-destr-06-10-23.jpg',
              'https://i.postimg.cc/ht9VTx4y/1025-BMP-2-675-sb3-KDZ-destr-22-09-23.jpg',
            ],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 1,
            list: ['https://i.postimg.cc/rsJXQgr0/h66.jpg'],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 1,
            list: ['https://i.postimg.cc/05pQKcnw/1031-BMP-2-675-sb3-KDZ-dam-capt.jpg'],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
      ],
    },
    {
      name: 'Command Posts And Communications Stations',
      statistics: {
        count: 18,
        destroyed: 14,
        damaged: 0,
        abandoned: 0,
        captured: 4,
      },
      details: [
        {
          name: 'BMP-1KSh command and staff vehicle',
          count: 2,
          destroyed: {
            count: 2,
            list: ['https://i.postimg.cc/VLdFx7YY/b7.png', 'https://i.postimg.cc/QCDqBvsP/2001-BMP-1-KSh-destr.jpg'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'K1Sh1 command and staff vehicle',
          count: 1,
          destroyed: {
            count: 0,
            list: [],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 1,
            list: ['https://i.postimg.cc/qB5M9TWT/776.jpg'],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'R-142N command and staff vehicle',
          count: 1,
          destroyed: {
            count: 1,
            list: ['https://i.postimg.cc/y6TgnPB0/443gf.png'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: "BTR-70DI-02 'Svityaz' command and staff vehicle",
          count: 1,
          destroyed: {
            count: 0,
            list: [],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 1,
            list: ['https://i.postimg.cc/W3nKYKXB/447p.png'],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'R-145BM command vehicle',
          count: 2,
          destroyed: {
            count: 1,
            list: ['https://i.postimg.cc/C5P7Vr3J/2010-R-145-BM-command-vehicle-destr-16-05-23.jpg'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 1,
            list: ['https://i.postimg.cc/nVsmGbjV/32.png'],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'BTR-60PU-12 air defence command vehicle',
          count: 3,
          destroyed: {
            count: 2,
            list: ['https://i.postimg.cc/tCJKzZRF/332.png', 'https://i.postimg.cc/CMQ98VXQ/4332.png'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 1,
            list: ['https://i.postimg.cc/kX7WQKTW/4679.png'],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'R-409A radio station vehicle',
          count: 1,
          destroyed: {
            count: 1,
            list: ['https://twitter.com/UAWeapons/status/1547660596249694211'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'R-405M radio station vehicle',
          count: 1,
          destroyed: {
            count: 1,
            list: ['https://twitter.com/UAWeapons/status/1547660596249694211'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'R-845 radio station',
          count: 1,
          destroyed: {
            count: 1,
            list: ['https://i.postimg.cc/vm0vL7zP/2005-R-845-radio-station-destr-24-02-22.jpg'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'ZiL-131-based KShM KUNG command vehicle',
          count: 1,
          destroyed: {
            count: 1,
            list: ['https://i.postimg.cc/FRMGgXDw/6511.png'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'Radio relay station for the TB2 UCAV',
          count: 1,
          destroyed: {
            count: 1,
            list: ['https://twitter.com/UAWeapons/status/1552621037057187840'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'Control station for the TB2 UCAV',
          count: 2,
          destroyed: {
            count: 2,
            list: ['https://i.postimg.cc/SQVxQ1gY/2000-4x-tb2-ucav-and-2-ground-stations-destr-24-02-22.png'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
        {
          name: 'SkyGuard Aspide control station',
          count: 1,
          destroyed: {
            count: 1,
            list: ['https://twitter.com/UAWeapons/status/1683139938743644162'],
          },
          damaged: {
            count: 0,
            list: [],
          },
          captured: {
            count: 0,
            list: [],
          },
          abandoned: {
            count: 0,
            list: [],
          },
          damagedAndCaptured: {
            count: 0,
            list: [],
          },
          damagedAndAbandoned: {
            count: 0,
            list: [],
          },
        },
      ],
    },
  ],
};

describe('ORYXFormatter', () => {
  const scrappedData: OryxScrapResult = {
    title: 'Russia - 12656, of which: destroyed: 8760, damaged: 524, abandoned: 477, captured: 2895',
    entities: [
      {
        summary: 'Tanks (2404, of which destroyed: 1571, damaged: 137, abandoned: 146, captured: 550)',
        list: [
          `<img alt=\"\" class=\"thumbborder\" data-file-height=\"600\" data-file-width=\"900\" height=\"15\" src=\"https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/23px-Flag_of_Russia.svg.png\" width=\"23\"> 14 T-72B Obr. 2022:&nbsp;<a href=\"https://twitter.com/UAWeapons/status/1632339858533367808\">(1, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/02cDmxgj/1016-t72b-2022-destr-01-07-23.jpg\">(2, destroyed)</a> <a href=\"https://twitter.com/naalsio26/status/1696337466855141423\">(3, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/mrBfmjtL/1001-T-72-B-Obr-2022-destr-26-09-23.jpg\">(4, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/qBYPP4zZ/1039-t72b2022-destr-04-10-23.jpg\">(5, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/MpJhG507/1055-t72b3-obr2022-destr-03-10-23.jpg\">(6, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/65gMh8GF/3287.png\">(7, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/KvNJVmLG/1302-2x-t72b2022-destr.jpg\">(8 and 9, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/J0s6fHbS/1341-t72b-obr2022-dam-08-10-23.jpg\">(1, damaged)</a>&nbsp;<a href=\"https://i.postimg.cc/DwFvf0H4/1016-BREM-1-BTR-82-A-T-72-A-T-72-B3-dam-aband-08-07-23.jpg\">(1, damaged and abandoned)</a>&nbsp;<a href=\"https://i.postimg.cc/cLKTshcY/1016-t72b-2022-dam-aband-14-07-23.jpg\">(2, damaged and abandoned)</a> <a href=\"https://i.postimg.cc/K8KNkcMC/3260.png\">(3, damaged and abandoned)</a>&nbsp;<a href=\"https://i.postimg.cc/cC9D67N1/1032-T-72-B-Obr-2022-dam-aband-11-10-23.jpg\">(4, damaged and abandoned)</a>`,
        ],
      },
      {
        summary:
          'Armoured Fighting Vehicles (1005, of which destroyed: 668, damaged: 29, abandoned: 39, captured: 269)',
        list: [
          `<img alt=\"\" class=\"thumbborder\" data-file-height=\"600\" data-file-width=\"900\" height=\"15\" src=\"https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/23px-Flag_of_Russia.svg.png\" width=\"23\"> 13 BMP-2 675-sb3KDZ:&nbsp;<a href=\"https://i.postimg.cc/D0NRFvR3/1004-BMP-2-675-SB3-KDZ-destr.jpg\">(1, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/gkbWtRbK/1007-BMP-2-675-sb3-KDZ-destr-27-05-23.jpg\">(2, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/L6pvZN1v/1043-BMP-2-675-sb3-KDZ-destr-08-06-23.jpg\">(3, destroyed)</a>&nbsp;<a href=\"https://twitter.com/UAWeapons/status/1668515155100028929\">(4 and 5, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/d04zYVcF/1011-BMP-2-with-675-sb3-KDZ-add-on-armour-destr-29-06-23.jpg\">(6, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/g0kLXD2p/43700.png\">(7, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/5yMtsw3g/5554.png\">(8, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/tRnt6VGM/1026-2x-BMP-2-675-sb3-KDZ-destr-06-10-23.jpg\">(9 and 10, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/ht9VTx4y/1025-BMP-2-675-sb3-KDZ-destr-22-09-23.jpg\">(11, destroyed)</a>&nbsp;<a href=\"https://i.postimg.cc/rsJXQgr0/h66.jpg\">(1, captured)</a>&nbsp;<a href=\"https://i.postimg.cc/05pQKcnw/1031-BMP-2-675-sb3-KDZ-dam-capt.jpg\">(2, damaged and captured)</a>`,
        ],
      },
      {
        summary: 'Command Posts And Communications Stations (18, of which destroyed: 14, captured: 4)',
        list: [
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23"> 2 BMP-1KSh command and staff vehicle: <a href="https://i.postimg.cc/VLdFx7YY/b7.png">(1, destroyed)</a>&nbsp;<a href="https://i.postimg.cc/QCDqBvsP/2001-BMP-1-KSh-destr.jpg">(2, destroyed)</a>',
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23"> 1 K1Sh1 command and staff vehicle: <a href="https://i.postimg.cc/qB5M9TWT/776.jpg">(1, captured)</a>',
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23"> 1 R-142N command and staff vehicle: <a href="https://i.postimg.cc/y6TgnPB0/443gf.png">(1, destroyed)</a>',
          '<img alt="" class="thumbborder" data-file-height="800" data-file-width="1200" height="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/23px-Flag_of_Ukraine.svg.png" width="23"> 1 BTR-70DI-02 \'Svityaz\' command and staff vehicle: <a href="https://i.postimg.cc/W3nKYKXB/447p.png">(1, captured)</a>',
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23"> 2 R-145BM command vehicle:&nbsp;<a href="https://i.postimg.cc/C5P7Vr3J/2010-R-145-BM-command-vehicle-destr-16-05-23.jpg">(1, destroyed)</a>&nbsp;<a href="https://i.postimg.cc/nVsmGbjV/32.png">(1, captured)</a>',
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23"> 3 BTR-60PU-12 air defence command vehicle: <a href="https://i.postimg.cc/tCJKzZRF/332.png">(1, destroyed)</a>&nbsp;<a href="https://i.postimg.cc/CMQ98VXQ/4332.png">(2, destroyed)</a>&nbsp;<a href="https://i.postimg.cc/kX7WQKTW/4679.png">(1, captured)</a>&nbsp; ',
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23">&nbsp;1 R-409A radio station vehicle:&nbsp;<a href="https://twitter.com/UAWeapons/status/1547660596249694211">(1, destroyed)</a>',
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23">&nbsp;1 R-405M radio station vehicle:&nbsp;<a href="https://twitter.com/UAWeapons/status/1547660596249694211">(1, destroyed)</a>',
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23">&nbsp;1&nbsp;R-845 radio station:&nbsp;<a href="https://i.postimg.cc/vm0vL7zP/2005-R-845-radio-station-destr-24-02-22.jpg">(1, destroyed)</a>',
          '<img alt="" class="thumbborder" data-file-height="600" data-file-width="1200" height="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/23px-Flag_of_the_Soviet_Union.svg.png" width="23"> 1 ZiL-131-based KShM KUNG command vehicle:&nbsp;<a href="https://i.postimg.cc/FRMGgXDw/6511.png">(1, destroyed)</a>',
          '<img alt="" class="thumbborder" data-file-height="800" data-file-width="1200" height="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/23px-Flag_of_Turkey.svg.png" width="23">&nbsp;1 Radio relay station for the TB2 UCAV:&nbsp;<a href="https://twitter.com/UAWeapons/status/1552621037057187840">(1, destroyed)</a>',
          '<img alt="" class="thumbborder" data-file-height="800" data-file-width="1200" height="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/23px-Flag_of_Turkey.svg.png" width="23">&nbsp;2&nbsp;Control station for the TB2 UCAV:&nbsp;<a href="https://i.postimg.cc/SQVxQ1gY/2000-4x-tb2-ucav-and-2-ground-stations-destr-24-02-22.png">(1 and 2, destroyed)</a>',
          '<img alt="" class="thumbborder" data-file-height="1000" data-file-width="1500" height="15" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/23px-Flag_of_Italy.svg.png" width="23">&nbsp;1&nbsp;SkyGuard Aspide control station:&nbsp;<a href="https://twitter.com/UAWeapons/status/1683139938743644162">(1, destroyed)</a>',
        ],
      },
    ],
  };
  let formatter: OryxFormatter;
  beforeEach(() => {
    formatter = new OryxFormatter(scrappedData);
  });
  describe('format', () => {
    it('should format the scrapped data into string', async () => {
      const formattedData = await formatter.format();
      expect(formattedData).toEqual(JSON.stringify(resultData));
    });
  });
  describe('formatPretty', () => {
    it('should format the scrapped data into string with indents', async () => {
      const formattedData = await formatter.formatPretty();
      expect(formattedData).toEqual(JSON.stringify(resultData, null, 2));
    });
  });
  describe('formatAsIs', () => {
    it('should format the scrapped data into oryx format result', async () => {
      const formattedData = await formatter.formatAsIs();
      expect(formattedData).toEqual(resultData);
    });
  });
});
