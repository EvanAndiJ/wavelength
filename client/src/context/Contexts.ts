import { createContext } from "react";

export const GameContext = createContext({
    host: '',
    code:'',
    totalUser: 0,
    users: [],
    teams: [[],[],[]],
    playing: false,
    score: [0,0],
    turn: 1,
    phase: 1,
    round: 1,
    target: 50,
    screen: false,
    range:[],
    discard: [],
    psych: ['',''],
    psychUsed: [[],[]],
    guess: 50,
    secondGuess:1,
    clue:''
})

export const UserContext = createContext({
    name: '',
    room: '',
    team: 0,
    psych: false,
    screen: false,
    ably: '',
})