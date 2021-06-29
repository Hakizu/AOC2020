"use strict"
//https://adventofcode.com/2020/day/4
//load input
const fs = require('fs')
const encoded = fs.readFileSync("/Users/hakizu/Downloads/message.txt", 'utf-8')
const input = encoded.split('\n\n')

//Part1
const groupsCounts = input.map(it => countAnswers(it))

function countAnswers(args){
    const removedWhitespace = args.split(/\s/)
    const segmentAnswers = removedWhitespace.map(it => it.split(''))
    const flattenedSegment = segmentAnswers.flatMap(it => it)
    
    const yesQuestions = flattenedSegment.reduce((acc, curr) => 
        (acc[curr] = true, acc),{})
    
    return Object.keys(yesQuestions).length
}
console.log(groupsCounts.reduce((acc, curr) => acc + curr))

//Part2

const secondAnswer = input.map(it => {
    const uniqueSet = new Set()

    const numberOfLines = it.split('\n')
    if (numberOfLines.length === 1) {
        it.split('').forEach(el => uniqueSet.add(el))
        return uniqueSet
    }

    numberOfLines.filter((it, index) => {
        const singleAnswer = it.split('')

        return singleAnswer.filter(singleSet => {

            const answerPassed = numberOfLines.every((element, secondIndex) => {
                if (index === secondIndex) {
                    return true
                }
                const answers = element.split('')
                return answers.includes(singleSet)
            })
            if (answerPassed) {
                uniqueSet.add(singleSet)
            }
            return answerPassed

        })
        
    })
    return uniqueSet
})

console.log(secondAnswer.map(it => it.size).reduce((acc, curr) => acc + curr))
