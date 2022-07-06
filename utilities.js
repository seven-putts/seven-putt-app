
const getSuccessAndFailure = (section) =>{
    const successes = section.filter(attempt => attempt === "success").length
    const fails = section.filter(attempt => attempt !== "success").length

    return { successes, fails }
}

const getMaxValue = (arr) => {
    let highest = 0

    arr.forEach(val => {
        if(val >= highest){
            highest = val
        }
    })

    return highest
}

export const getPlayerData = (games) => {
    if(!games) return 

    const length = games.length
    
    let putts = 0
    let highestSec = 0
    let highestRound = 0
    let highestGamePutt = 0

    games.forEach(game => {
        putts += game.putts
        let round 
        let sec

        if(game.putts > highestGamePutt) {
            highestGamePutt = game.putts
        }

        const round1SecASuccess = getSuccessAndFailure(game.round1.sectionA).successes
        const round1SecBSuccess = getSuccessAndFailure(game.round1.sectionB).successes
        const round1SecCSuccess = getSuccessAndFailure(game.round1.sectionC).successes
        const round1SecDSuccess = getSuccessAndFailure(game.round1.sectionD).successes
        const round1 = round1SecASuccess + round1SecBSuccess + round1SecCSuccess + round1SecDSuccess

        const round2SecASuccess = getSuccessAndFailure(game.round2.sectionA).successes
        const round2SecBSuccess = getSuccessAndFailure(game.round2.sectionB).successes
        const round2SecCSuccess = getSuccessAndFailure(game.round2.sectionC).successes
        const round2SecDSuccess = getSuccessAndFailure(game.round2.sectionD).successes
        const round2 = round2SecASuccess + round2SecBSuccess + round2SecCSuccess + round2SecDSuccess 

        const round3SecASuccess = getSuccessAndFailure(game.round3.sectionA).successes
        const round3SecBSuccess = getSuccessAndFailure(game.round3.sectionB).successes
       const  round3SecCSuccess = getSuccessAndFailure(game.round3.sectionC).successes
       const  round3SecDSuccess = getSuccessAndFailure(game.round3.sectionD).successes

       const round3 = round3SecASuccess + round3SecBSuccess + round3SecCSuccess + round3SecDSuccess

        if(round1 > round2 && round1 > round3) {
            round = round1
        }else if(round2 > round1 && round2 > round3 ) {
            round = round2
        }else {
            round = round3
        }

        const arrOfSection = [round1SecASuccess, round1SecBSuccess, round1SecCSuccess, round1SecDSuccess, round2SecASuccess, round2SecBSuccess, round2SecCSuccess, round2SecDSuccess, round3SecASuccess, round3SecBSuccess, round3SecCSuccess, round3SecDSuccess  ]
        sec = getMaxValue(arrOfSection)

        if(sec > highestSec){
            highestSec = sec
        }

        if(round > highestRound){
            highestRound = round
        }
    })

    return { highestSec, highestRound, putts, length, highestGamePutt }
}