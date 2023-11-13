export interface Game {
    score: [number, number],
    round: number,
    phase: number,
    turn: number,
    range: [[string,string], number],
    discard: number[],
    target: number,
    screen: boolean,
    guess: number,
    users: string[],
    teams: [string[],string[],string[]],
    psych: [string, string],
    psychUsed: [string[], string[]],
    clue: string,
    host: string,
    playing: boolean,
}

export interface User {
    name: string,
    psych: boolean,
    room: string,
    team: number,
}

export interface Teams {
    1:string[],
    2:string[],
    all:string[]
}

export interface GameContext {
    game: Game,
    user: User,
    teams: Teams,
}

export interface PlayerAreaProps {
    context?: GameContext,
    game: Game,
    user: User,
    onJoin: (team: number, join: number) => void,
}

export interface TeamBoxProps extends PlayerAreaProps{
    team: number,
}

export interface TargetAreaProps {
    guessLock: boolean,
    updateGuess: (newGuess: string)=>void,
    screen: boolean,
    toggleScreen: ()=>void,
}

export interface GameAreaProps {
    isDraw: boolean,
    setClue: (clue: string) => void,
    onDraw: ()=>void,
    submitGuess: ()=>void,
    changeSecondGuess: (side:string)=>void,
    submitSecondGuess: ()=>void,
    gameToggle: ()=>void,
  }