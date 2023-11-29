# Russian Losses in Ukraine Scraper

Russian unprovoked aggression continues. Tens of thousands civilians were killed, and millions had to flee from their homes.
Russian war against Ukraine is pure Imperial madness and genocide of ukrainian people.
Please support Ukraine in our fight for freedom.

<a href="https://en.wikipedia.org/wiki/War_crimes_in_the_Russian_invasion_of_Ukraine">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg" alt="Ukraine flag" width="240" height="160">
</a>

Links for donations:

- [UNITED24](https://u24.gov.ua/)
- [savelife.in.ua](https://savelife.in.ua/en/)
- [prytulafoundation.org](https://prytulafoundation.org/en)

## Table of Contents

- [General Info](#general-info)
- [Installation](#installation)
- [Building the Application](#building-the-application)
- [Usage](#usage)
- [Usage with node-ts](#usage-with-node-ts)
- [Flags and Parameters](#flags-and-parameters)
- [Example Usage](#example-usage)
- [Example Scrap result](#example-scrap-result)

## General Info

It's CLI application to scrape data on Russian losses in the war in Ukraine from multiple sources.
This Node.js application allows you to scrape data on Russian losses in the war in Ukraine from two sources: the Ministry of Defence (MOD) of Ukraine and OSINT Oryx site data (both Ukraine and Russia losses). You can output the scraped data in different ways, including storing it in a file or returning it to the parent process.

Feel free to fork or use this code.

## Installation

Make sure you have Node.js (>=16.17) and TypeScript (>=4.8) installed on your system.

1. Clone this repository:

```sh
   git clone https://github.com/Volodymyr-Mishyn/russian-losses-scrapper.git
   cd russian-losses-scrapper
```

2. Install the required dependencies:

```sh
   npm install
```

## Building the Application

To build the application, you can use the following command:

```sh
  npm run build
```

## Usage

After installation and building, you can use the CLI application with the following command:

```sh
  node dist/src/index.js [flags and parameters]
```

## Usage with node-ts

After installation, you can run TypeScript code without building with `ts-node`:

```sh
  ts-node ./src/index.ts [flags and parameters]
```

Or use provided scripts in `package.json`.

## Flags and Parameters

- `--source`: Specify the data source (required).

  - `mod`: Ministry of Defense (MOD) of Ukraine. Currently scrapped from Ministry of Finance site.
  - `oryx`: OSINT Oryx site data (both Ukraine and Russia losses).

- `--oryxType` (only required if `--source=oryx`): Specify the Oryx data type.

  - `Ukraine`: Data on losses in Ukraine.
  - `Russia`: Data on losses in Russia.

- `--full`: (optional, only works when `--source=mod`) Scrape and return the data from 24.02.2022.

- `--output`: Specify the output method (required).

  - `file`: Store the scraped data in a file.
  - `process`: Return the data to the parent process.
  - `http`: Return the data via http.

- `--outputPath` Specify the path to return output (file name, url, parent process key).

- `--notHeadless` (for debugging purposes): Don't use headless mode for scraping.

### Example Usage:

1. Scrape MOD data and save it to a file:

```sh
   node ./dist/src/index.js --source=mod --full --output=file --outputPath=mod.txt
```

2. Scrape ORYX data and save it to a file:

```sh
   node-ts ./src/index.ts --source=oryx --oryxType=Russia --output=file --outputPath=mod.txt
```

## Example Scrap result

1. Oryx scrap result example

```json
{
  "success": true,
  "result": {
    "date": "2023-10-25T11:38:44.619Z",
    "type": "oryx",
    "data": {
      "name": "Russia",
      "statistics": {
        "count": 12784,
        "destroyed": 8847,
        "damaged": 548,
        "abandoned": 490,
        "captured": 2899
      },
      "entities": [
        {
          "name": "Tanks",
          "statistics": {
            "count": 2426,
            "destroyed": 1587,
            "damaged": 137,
            "abandoned": 154,
            "captured": 550
          },
          "details": [
            {
              "name": "T-62M",
              "count": 65,
              "destroyed": {
                "count": 25,
                "list": [
                  "https://twitter.com/UAWeapons/status/1544797070883684353",
                  "https://i.postimg.cc/X72RXDmM/1024-t62m-destr-11-01-23.jpg",
                  "other image links..."
                ]
              },
              "damaged": {
                "count": 5,
                "list": ["other image links..."]
              },
              "captured": {
                "count": 35,
                "list": ["other image links..."]
              },
              "abandoned": {
                "count": 0,
                "list": []
              },
              "damagedAndCaptured": {
                "count": 30,
                "list": ["other image links..."]
              },
              "damagedAndAbandoned": {
                "count": 0,
                "list": []
              }
            }
          ]
        }
      ]
    }
  }
}
```

2. Ministry of defense scrap result example

```json
{
  "success": true,
  "result": {
    "date": "2023-11-29T14:34:23.580Z",
    "type": "mod",
    "data": [
      {
        "date": "2023-11-29T00:00:00.000Z",
        "casualties": [
          {
            "name": "Tanks",
            "total": 5538,
            "increment": 15
          },
          {
            "name": "Armored fighting vehicle",
            "total": 10312,
            "increment": 27
          },
          {
            "name": "Artillery systems",
            "total": 7908,
            "increment": 32
          },
          {
            "name": "MLRS",
            "total": 910,
            "increment": 3
          },
          {
            "name": "Anti-aircraft warfare",
            "total": 600,
            "increment": 3
          },
          {
            "name": "Planes",
            "total": 323,
            "increment": 0
          },
          {
            "name": "Helicopters",
            "total": 324,
            "increment": 0
          },
          {
            "name": "UAV",
            "total": 5944,
            "increment": 39
          },
          {
            "name": "Cruise missiles",
            "total": 1567,
            "increment": 2
          },
          {
            "name": "Ships (boats)",
            "total": 22,
            "increment": 0
          },
          {
            "name": "Submarines",
            "total": 1,
            "increment": 0
          },
          {
            "name": "Cars and cisterns",
            "total": 10348,
            "increment": 46
          },
          {
            "name": "Special equipment",
            "total": 1121,
            "increment": 8
          },
          {
            "name": "Military personnel",
            "total": 327580,
            "increment": 1140
          }
        ]
      },
      {
        "date": "2023-11-28T00:00:00.000Z",
        "casualties": [
          {
            "name": "Tanks",
            "total": 5523,
            "increment": 3
          },
          {
            "name": "Armored fighting vehicle",
            "total": 10285,
            "increment": 3
          },
          {
            "name": "Artillery systems",
            "total": 7876,
            "increment": 1
          },
          {
            "name": "MLRS",
            "total": 907,
            "increment": 0
          },
          {
            "name": "Anti-aircraft warfare",
            "total": 597,
            "increment": 0
          },
          {
            "name": "Planes",
            "total": 323,
            "increment": 0
          },
          {
            "name": "Helicopters",
            "total": 324,
            "increment": 0
          },
          {
            "name": "UAV",
            "total": 5905,
            "increment": 0
          },
          {
            "name": "Cruise missiles",
            "total": 1565,
            "increment": 0
          },
          {
            "name": "Ships (boats)",
            "total": 22,
            "increment": 0
          },
          {
            "name": "Submarines",
            "total": 1,
            "increment": 0
          },
          {
            "name": "Cars and cisterns",
            "total": 10302,
            "increment": 3
          },
          {
            "name": "Special equipment",
            "total": 1113,
            "increment": 0
          },
          {
            "name": "Military personnel",
            "total": 326440,
            "increment": 860
          }
        ]
      }
    ]
  }
}
```
