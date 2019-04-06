import { Entity } from './entity';
import { bulletType } from './ammo/ammoCollection';

export class Unit extends Entity {
    type;
    ammo = undefined;
    bulletInstance = undefined;
    shootWait = undefined;
    shootAllowed = false;
    changeAmmo(ammoId) {
        this.ammo = ammoId;
        this.bulletInstance = new bulletType[ammoId];
    }
    hurt(dmg) {
        this.hp -= dmg;
    }
}