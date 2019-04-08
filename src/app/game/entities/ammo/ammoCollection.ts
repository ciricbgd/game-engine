import { LightRound } from './LightRound';
import { Shotgun } from './shotgun';
import { Torpedo } from './torpedo';
import { Explosion } from './explosion';


export var bulletType = [
    undefined,//0
    LightRound,//1
    Shotgun,//2
    Torpedo, //3
    Explosion,//4
];


export var enemyAttacks = [];//Array of enemy bullets and other attacks
export var friendlyAttacks = [];//Array of friendly bullets and special attacks