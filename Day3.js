"use strict"
//https://adventofcode.com/2020/day/3
//load input
const fs = require('fs')
const encoded = fs.readFileSync("/Users/hakizu/Downloads/message.txt")
const input = encoded.toString('utf-8').split('\n')

//Part1
const rowLength = input.length
const columnLength = input[0].length

function numberOfTrees(columnIncrement, rowIncrement) {
    let colIndex = 0
    let trees = 0 
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex += rowIncrement) {
        if (input[rowIndex][colIndex % columnLength] === '#') {
            trees++
        }
        colIndex += columnIncrement
    }
    return trees
}
const answer = numberOfTrees(3, 1)
console.log(answer)

//Part2
const slopes = [[1, 1] , [5, 1], [3, 1], [7, 1], [1, 2]]
const secondAnswer = slopes.map(it => {
    return numberOfTrees(it[0], it[1])
})
console.log(secondAnswer.reduce((a, b) => a * b))