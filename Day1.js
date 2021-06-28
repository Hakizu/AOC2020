"use strict"
//https://adventofcode.com/2020/day/1
//load input
const fs = require('fs')
const encoded = fs.readFileSync("/Users/hakizu/Downloads/message.txt")
const input = encoded.toString('utf-8').split('\n')

//Part1
const toNumberInput = input.map(it => parseInt(it))
const sortedInput = toNumberInput.sort()
const targetValue = 2020

sortedInput.find(it => {
    const neededValue = targetValue - it
    if (sortedInput.includes(neededValue)) {
        console.log(neededValue * it)
        return true
    }
})

//Part2
sortedInput.find(it => {
    const sumOfNeededValues = targetValue - it
    return findTwoRemainingInputs(sumOfNeededValues, it)
})

function findTwoRemainingInputs (targetValue, excludedValue) {
    const wasSuccessful = sortedInput.find(it => {
        if (excludedValue === it) {
            return
        }

        const neededValue = targetValue - it

        if (sortedInput.includes(neededValue)) {
            console.log(excludedValue * neededValue * it)
            return true
        }
    })
    return wasSuccessful
}