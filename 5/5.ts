import * as fs from 'fs';

interface Coords {
  from: string,
  to: string,
  ranges: Range[],
}

interface Range {
  destination: number,
  source: number,
  length: number,
}

interface Input {
  seeds: number[],
  maps: Coords[],
}

function parseLine(line: string): number[] {
  return line
    .trim()
    .split(/ /)
    .map(i => parseInt(i))
}

function parseRanges(ranges: number[][]) {
  return ranges.map<Range>(range => {
    return {
      destination: range[0],
      source: range[1],
      length: range[2],
    }
  })
}

function parseInput(): Input {
  const contents: string = fs.readFileSync('input.txt', 'utf-8')
  const mapStrings = contents.split(/\n\n/)
  const seeds = parseLine((mapStrings.shift() as string).split(/:/)[1])

  const maps = mapStrings.map<Coords>(map => {
    const [label, coords] = map.split(/:/).map(c => c.trim())
    const values = coords
      .split(/\n/)
      .map(line => parseLine(line))

    const [_, from, to] = label.match(/(\w+)-to-(\w+)/) as RegExpMatchArray

    return {
      from,
      to,
      ranges: parseRanges(values),
    }
  })

  return {
    seeds,
    maps,
  }
}

function getMap(input: Input, type: string): Coords {
  return input.maps.find(map => map.from === type) as Coords
}

function destinationValue(map: Coords, number: number): number {
  for (const range of map.ranges) {
    if (number >= range.source && number < (range.source + range.length)) {
      return range.destination + (number - range.source)
    }
  }

  return number
}

function seedLocation(input: Input, seed: number) {
  let currentMap = input.maps[0];
  let location = seed;

  while (true) {
    location = destinationValue(currentMap, location)

    if (currentMap.to === "location") {
      return location;
    } else {
      currentMap = getMap(input, currentMap.to)
    }
  }
}

const input = parseInput()

// Part 1
console.log(Math.min(...input.seeds.map(seed => seedLocation(input, seed))))

// Part 2
let min: number = Infinity
for (let i = 0; i < input.seeds.length; i+=2) {
  for (let n = input.seeds[i]; n < input.seeds[i] + input.seeds[i+1]; n++) {
    min = Math.min(min, seedLocation(input, n))
  }
}

console.log(min)
