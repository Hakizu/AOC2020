"use strict"
//https://adventofcode.com/2020/day/2
//load input
const fs = require('fs')
const encoded = fs.readFileSync("/Users/hakizu/Downloads/message.txt")
const input = encoded.toString('utf-8').split('\n')

//Part1
const validPasswords = input.filter(it => {

    const {first: policy, second: password} = splitSegments(it, ':', true)
    const {first: policyNumber, second: policyChar} = splitSegments(policy, ' ')
    const {first: policyNumberMin, second: policyNumberMax} = 
        splitSegments(policyNumber, '-', false, true)

    const regex = new RegExp(policyChar, "g")
    const matchedChars = password.match(regex)
    const numberOfMatches = matchedChars?.length

    const passwordIsValid = 
        policyNumberMin <= numberOfMatches &&
        numberOfMatches <= policyNumberMax
    return passwordIsValid
})
console.log(validPasswords.length)


function splitSegments(arg, split, slice, parse) {
    const segments = arg.split(split)
    if (slice) {
        const slicedSegments = [segments[0], segments[1].slice(1)]
        return {first: slicedSegments[0], second: slicedSegments[1]}
    }
    if (parse) {
        const numberSegments = segments.map(it => parseInt(it))
        return {first : numberSegments[0], second: numberSegments[1]}
    }
    return {first: segments[0], second: segments[1]}
}


//Part2
const partTwo = input.filter(it => {
    const {first: policy, second: password} = splitSegments(it, ':', true)
    const {first: policyNumber, second: policyChar} = splitSegments(policy, ' ')
    const {first: policyNumberMin, second: policyNumberMax} = 
        splitSegments(policyNumber, '-', false, true)

    const firstIndex = policyNumberMin - 1
    const secondIndex = policyNumberMax - 1

    if (password[firstIndex] === policyChar ||
        password[secondIndex] === policyChar ||
        password[secondIndex] === undefined) {

            const isInvalid = password[firstIndex] === policyChar &&
                password[secondIndex] === policyChar
            return !isInvalid
        }
})

console.log(partTwo.length)