"use strict"
//https://adventofcode.com/2020/day/3
//load input
const fs = require('fs')
const encoded = fs.readFileSync("/Users/hakizu/Downloads/message.txt")
const input = encoded.toString('utf-8').split('\n')

const seatID = input.map(it => {
    const rowSegment = it.slice(0, -3)
    const columnSegment = it.slice(-3)

    const row = findSpot(rowSegment, 127, 'F')
    const column = findSpot(columnSegment, 8, 'L')
    return row * 8 + column
})
console.log(Math.max(...seatID))

function findSpot (arg, rows, lower) {
    const steps = arg.split('')
    let upperBound = rows
    let lowerBound = 0

    steps.forEach(it => {
        const currentRange = upperBound - lowerBound
        if (it === lower) {
            upperBound -= Math.floor(currentRange / 2) + 1
            return
        }
        lowerBound += Math.ceil(currentRange / 2) 
    })
    return lowerBound
}

//Part2
const sortedSeatIds = seatID.sort((a, b) => a - b)
const seatBeforeMissingSeat = sortedSeatIds.filter((it, index) => {
    const nextId = sortedSeatIds[index + 1]
    return (it + 1) !== nextId
})
console.log(seatBeforeMissingSeat[0] + 1) //remaining seat