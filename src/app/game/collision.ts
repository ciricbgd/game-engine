import * as  entities from '../game/entities';

export function collides(entity1, entity2) {
    if (entity1 == null || entity1 == undefined || entity2 == null || entity2 == undefined) {
        return;
    }
    if (((entity1.x + entity1.w / 2 > entity2.x - entity2.w / 2 && entity1.x + entity1.w / 2 < entity2.x + entity2.w / 2) || (entity1.x - entity1.w / 2 > entity2.x - entity2.w / 2 && entity1.x - entity1.w / 2 < entity2.x + entity2.w / 2)) && ((entity1.y + entity1.h / 2 > entity2.y - entity2.h / 2 && entity1.y + entity1.h / 2 < entity2.y + entity2.h / 2) || (entity1.y - entity1.h / 2 > entity2.y - entity2.h / 2 && entity1.y - entity1.h / 2 < entity2.y + entity2.h / 2))) {
        return true;
    }
    let temoraryEntity = entity1;
    entity1 = entity2;
    entity2 = temoraryEntity;
    if (((entity1.x + entity1.w / 2 > entity2.x - entity2.w / 2 && entity1.x + entity1.w / 2 < entity2.x + entity2.w / 2) || (entity1.x - entity1.w / 2 > entity2.x - entity2.w / 2 && entity1.x - entity1.w / 2 < entity2.x + entity2.w / 2)) && ((entity1.y + entity1.h / 2 > entity2.y - entity2.h / 2 && entity1.y + entity1.h / 2 < entity2.y + entity2.h / 2) || (entity1.y - entity1.h / 2 > entity2.y - entity2.h / 2 && entity1.y - entity1.h / 2 < entity2.y + entity2.h / 2))) {
        return true;
    }
    return false;
}

export function collisionDetection() {
    //For every enemy
    for (let j = 0; j < entities.enemies.length; j++) {
        //If player hits enemy
        if (collides(entities.player, entities.enemies[j])) {
            entities.player.hurt(entities.enemies[j].dmg);
        }
        //For every friendly bullet
        for (let i = 0; i < entities.friendlyAttacks.length; i++) {
            //If bullet hits enemy
            if (collides(entities.friendlyAttacks[i], entities.enemies[j])) {
                entities.enemies[j].hurt(entities.friendlyAttacks[i].dmg); // Enemy hurt  
                //If enemy hp is lower than 0
                if (entities.enemies[j].hp <= 0) { entities.enemies[j].die(j); }
                entities.friendlyAttacks[i].die(i); //Bullet death
            }
        }

        //For every enemy bullet
        for (let i = 0; i < entities.enemyAttacks.length; i++) {
            //If bullet hits enemy
            if (collides(entities.enemyAttacks[i], entities.player)) {
                entities.player.hurt(entities.enemyAttacks[i].dmg); // Player hurt
                entities.enemyAttacks[i].die(i); //Bullet death
            }
        }
    }
}