import { Entity } from './entity';
import { bulletType } from './ammo/ammoCollection';

export class Unit extends Entity {
    type;
    ammo = undefined;
    bulletInstance = undefined;
    specialammo = undefined;
    specialbulletInstance = undefined;
    shootWait = undefined;
    shootAllowed = false;
    changeAmmo(ammoId) {
        this.ammo = ammoId;
        this.bulletInstance = new bulletType[ammoId];
    }
    changeSpecialAmmo(ammoId) {
        this.specialammo = ammoId;
        this.specialbulletInstance = new bulletType[ammoId];
    };
    hurt(dmg) {
        this.hp -= dmg;
    }
    onshoot() {

    }
}