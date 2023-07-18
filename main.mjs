import Data from './Data.mjs'
import fs from 'fs'

var CharacterData = Data.CharacterData
var KartData = Data.KartData
var WheelData = Data.WheelData
var GliderData = Data.GliderData


function TotalSpeed(character, kart, wheel, glider) {
    let totalSpeed = 0
    totalSpeed += CharacterData[character]['Speed']
    totalSpeed += KartData[kart]['Speed']
    totalSpeed += WheelData[wheel]['Speed']
    totalSpeed += GliderData[glider]['Speed']
    return totalSpeed
}

function TotalMiniTurbo(character, kart, wheel, glider) {
    let totalMiniTurbo = 0
    totalMiniTurbo += CharacterData[character]['MiniTurbo']
    totalMiniTurbo += KartData[kart]['MiniTurbo']
    totalMiniTurbo += WheelData[wheel]['MiniTurbo']
    totalMiniTurbo += GliderData[glider]['MiniTurbo']
    return totalMiniTurbo
}

function weightedSpeed(character, kart, wheel, glider) {
    let totalSpeed = TotalSpeed(character, kart, wheel, glider)
    let totalMiniTurbo = TotalMiniTurbo(character, kart, wheel, glider)
    let x = (totalSpeed - .75) * 4
    let y = (totalMiniTurbo - .75) * 4
    let weightedSpeed = Math.round((1.006*((((.005*y)*((x*.025)+7.45))*((8.9*((y*1)+20))+(8.8*((y*2)+70))+(2.7*((y*3)+120))))+(((8.9*(y*1))+(8.8*(y*2))+(2.7*(y*3)))*((1.05+(.005*y))*((x*.025)+7.45)))+(((y*1)+15)*((.05*y)*((x*.025)+7.45)))+((y*1)*((.05*y+(1.30))*((x*.025)+7.45)))))+(.88*(8640*(.025*x))));

    return weightedSpeed
}

function IterateAllCharacters()
{
    fs.appendFileSync('TopKarts.txt', 'Weighted Speed, Character, Kart, Wheel, Glider\n');
    for (let character in CharacterData) {
        for (let kart in KartData) {
            let wheel = 'Roller'
                let glider = 'Cloud Glider'
                    let weightedSpeedValue = weightedSpeed(character, kart, wheel, glider)
                    if(weightedSpeedValue > 8500){
                    fs.appendFileSync('TopKarts.txt', weightedSpeedValue + ', ' + character + ', ' + kart + ', ' + wheel + ', ' + glider + '\n');
                    }
                }
            }
        }

IterateAllCharacters()