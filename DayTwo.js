"use strict"
//https://adventofcode.com/2020/day/2
//load input
const fs = require('fs')
const encoded = fs.readFileSync("/Users/hakizu/Downloads/message.txt")
const input = encoded.toString('utf-8').split('\n')

const validPasswords = input.filter(it => {
    const splitSegements = it.split(':')
    const policy = splitSegements[0]
    const password = splitSegements[1].slice(1) //remove whitespace

    const policySegments = policy.split(' ')
    const policyNumber = policySegments[0]
    const policyChar = policySegments[1]

    const regex = new RegExp(policyChar, "g")
    const matchedChars = password.match(regex)
    const numberOfMatches = matchedChars?.length

    const policyNumberSegments = policyNumber.split('-')
    const policyNumberMax = parseInt(policyNumberSegments[1])
    const policyNumberMin = parseInt(policyNumberSegments[0])

    const passwordIsValid = policyNumberMin <= numberOfMatches &&
        numberOfMatches <= policyNumberMax
    return passwordIsValid
})

console.log(validPasswords.length)