import { Console } from 'console'
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

function IterateAllCombos()
{
    let characterArray = new Array()
    let cartCombo = {
        weightedSpeedValue: 0,
        character: '',
        kart: '',
        wheel: '',
        glider: ''
    }
    fs.appendFileSync('output.txt', 'Weighted Speed, Character, Kart, Wheel, Glider\n');
    for (let character in CharacterData) {
        for (let kart in KartData) {
            for (let wheel in WheelData) {
                for (let glider in GliderData) {
                    let weightedSpeedValue = weightedSpeed(character, kart, wheel, glider)
                    cartCombo = {
                        weightedSpeedValue: weightedSpeedValue,
                        character: character,
                        kart: kart,
                        wheel: wheel,
                        glider: glider
                    }
                    characterArray.push(cartCombo)
                }
            }
        }
        characterArray.sort((a, b) => (b.weightedSpeedValue - a.weightedSpeedValue ))
        for(let i = 0; i < characterArray.length; i++)
        {
        fs.appendFileSync('output.txt', characterArray[i].weightedSpeedValue + ', ' + characterArray[i].character + ', ' + characterArray[i].kart + ', ' + characterArray[i].wheel + ', ' + characterArray[i].glider + '\n');
        }
        characterArray = []
    }
}

function IterateAllKingBoo()
{
    fs.appendFileSync('TopKingBoo.txt', 'Weighted Speed, Character, Kart, Wheel, Glider\n');
   let character = 'Shy Guy'
        for (let kart in KartData) {
            for (let wheel in WheelData) {
                for (let glider in GliderData) {
                    let weightedSpeedValue = weightedSpeed(character, kart, wheel, glider)
                    fs.appendFileSync('TopKingBoo.txt', weightedSpeedValue + ', ' + character + ', ' + kart + ', ' + wheel + ', ' + glider + '\n');
                    }
                }
            }
        }

IterateAllCombos()