import { LightRound } from './LightRound';
import { Shotgun } from './shotgun';


export var bulletType = [
    undefined,//0
    LightRound,//1
    Shotgun,//2
];

export var enemyAttacks = [];//Array of enemy bullets and other attacks
export var friendlyAttacks = [];//Array of friendly bullets and special attacks