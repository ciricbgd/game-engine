import { Entity } from '../entity';
import { bulletScreen } from '../../screen';
import { friendlyAttacks, enemyAttacks } from './ammoCollection';

export class Bullet extends Entity {
    type;
    double: boolean = false;
    screen = bulletScreen;
    constructor() {
        super();
        this.boxColor = '#ffe14f';
    }
    interval;//interval of bullets generated per time unit
    die(i) {
        if (this.type == 'friendly') {
            friendlyAttacks.splice(i, 1);
        }
        else if (this.type == 'enemy') {
            enemyAttacks.splice(i, 1);
        }
    }
}
