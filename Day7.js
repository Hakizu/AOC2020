"use strict"
//https://adventofcode.com/2020/day/7
//help by Alvin: https://www.youtube.com/watch?v=8qjS-h6ybdo
//load input
const fs = require('fs')
const encoded = fs.readFileSync("/Users/hakizu/Downloads/message.txt")
const input = encoded.toString('utf-8').split('\n')

const graph = {}
input.forEach(it => {
    const {top, bottom} = parseLine(it)

    if (!(top in graph)) {
        graph[top] = []
    }

    for (let src of bottom) {
        if (!(src in graph)) {
            graph[src] = []
        }
        graph[src].push(top)
    }

})

console.log(move(graph, 'shiny gold bag') -1)

function move (graph, point, cached = new Set()) {
    if (cached.has(point)) {
        return 0
    }
    cached.add(point)

    let amountOfColors = 1
    for (let neighbor of graph[point]) {
        amountOfColors += move(graph, neighbor, cached)
    }
    return amountOfColors
}

function parseLine (line) {
    const [top, rest] = line.split('s contain ')
    const sourceSegments = rest.split(', ')
    const bottom = []

    for (let i = 0; i < sourceSegments.length; i++) {
        const segment = sourceSegments[i]
        const amount = Number(segment[0])
        let source = amount === 1 ? segment.slice(2) : segment.slice(2, -1)
        if (i === sourceSegments.length -1) {
            source = source.slice(0, -1)
        }
        bottom.push(source)
    }
    return {
        top,
        bottom
    }
}

//Part2

const graphSE = {}
input.forEach(it => {
    const {top, bottom} = parseLinesWithNumbers(it)
    graphSE[top] = bottom
})

console.log(moveSE(graphSE, 'shiny gold bag') -1)

function moveSE (graph, node) {
    let count = 1
    for (let sibling in graph[node]) {
        const multiplier = graph[node][sibling]
        count += multiplier * moveSE(graphSE, sibling)
    }
    return count
}


function parseLinesWithNumbers (line) {
    const [top, rest] = line.split('s contain ')
    if (rest.slice(0, 3) === 'no ') {
        return {
            top,
            bottom: {}
        }
    }
    const sourceSegments = rest.split(', ')
    const bottom = {}

    for (let i = 0; i < sourceSegments.length; i++) {
        const segment = sourceSegments[i]
        const amount = Number(segment[0])
        let source = amount === 1 ? segment.slice(2) : segment.slice(2, -1)
        if (i === sourceSegments.length -1) {
            source = source.slice(0, -1)
        }
        bottom[source] = amount
    }
    return {
        top,
        bottom
    }
}