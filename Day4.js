"use strict"
//https://adventofcode.com/2020/day/4
//load input
const fs = require('fs')
const encoded = fs.readFileSync("/Users/hakizu/Downloads/message.txt", 'utf-8')
const input = encoded.split('\n\n')

//Part1
const passports = input.map(it => parseData(it))
const validPassports = passports.filter(it => {
    const amountOfKeys = Object.keys(it).length
    return it.cid === undefined ? amountOfKeys === 7 :
        amountOfKeys === 8
})
console.log(validPassports.length)

function parseData (string) {
    const segments = string.split(/\s/)
    const entries = segments.map(it => {
        const [key, value] = it.split(':')
        return [key, value]
    })
    const passports = Object.fromEntries(entries)
    return passports
}

//Part2
const answer = validPassports.filter(it => {
    if (!validateRange(it.byr, 1920, 2002)) {
        return
    }
    if (!validateRange(it.iyr, 2010, 2020)) {
        return
    }
    if (!validateRange(it.eyr, 2020, 2030)) {
        return
    }
    if (!validateHeight(it.hgt, [150, 193], [59, 76])) {
        return
    }
    if (!validateHairColor(it.hcl)) {
        return
    }
    if (!validateEyeColor(it.ecl)) {
        return
    }
    if (!validatePID(it.pid)) {
        return
    }
    return it
})

console.log(answer.length);

function validateRange(arg, min, max) {
    const value = parseInt(arg)
    if (typeof value !== 'number') {
        return false
    }
    return min <= value && value <= max
}

function validateHeight(arg, cm, inches) {
    const type = arg.slice(-2)
    if (type === 'cm') {
        return validateRange(arg, cm[0], cm[1])
    }
    if (type === 'in') {
        return validateRange(arg, inches[0], inches[1])
    }
    return
}

function validateHairColor(arg) {
    const pattern = /^#([0-9a-f]{6})$/
    return arg.match(pattern) !== null
}

function validateEyeColor(arg) {
    const selection = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    return selection.some(it => it === arg.slice(-3))
}

function validatePID(arg) {
    const pattern = /^([0-9]{9})$/
    return arg.match(pattern) !== null
}