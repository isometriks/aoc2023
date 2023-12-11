import * as fs from 'fs';

const [times, distances] = fs.readFileSync('input.txt', 'utf-8')
  .trim()
  .split(/\n/)
  .map<number[]>((line: string) => {
    const [_, values] = line.split(/:/)

    return values.trim().split(/ +/)
      .map(value => parseInt(value.trim()))
  })

interface Race {
  duration: number,
  distance: number,
}

const races= times.map<Race>((time, i) => {
  return {
    duration: time,
    distance: distances[i],
  }
})

const calculateScore = (hold: number, duration: number) => {
  return hold * (duration - hold)
}

const raceProduct = (race: Race) => {
  const wins: number[] = []

  for (let i = 0; i <= race.duration; i++) {
    const score = calculateScore(i, race.duration)

    if (score > race.distance) {
      wins.push(i)
    }
  }

  return wins.length
}

const part1 = races.map(race => raceProduct(race))
  .reduce((acc, value) => acc * value, 1)

console.log(part1)

const joinedRaces: Race = {
  duration: parseInt(races.map(race => race.duration).join('')),
  distance: parseInt(races.map(race => race.distance).join('')),
}

console.log(raceProduct(joinedRaces))
