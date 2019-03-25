import { player, enemies, friendlyAttacks, enemyAttacks } from './entities';

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
    for (let j = 0; j < enemies.length; j++) {
        //If player hits enemy
        if (collides(player, enemies[j])) {
            player.hurt(enemies[j].dmg);
        }
        //For every friendly bullet
        for (let i = 0; i < friendlyAttacks.length; i++) {
            //If bullet hits enemy
            if (collides(friendlyAttacks[i], enemies[j])) {
                enemies[j].hurt(friendlyAttacks[i].dmg); // Enemy hurt  
                //If enemy hp is lower than 0
                if (enemies[j].hp <= 0) { enemies[j].die(j); }
                friendlyAttacks[i].die(i); //Bullet death
            }
        }

        //For every enemy bullet
        for (let i = 0; i < enemyAttacks.length; i++) {
            //If bullet hits enemy
            if (collides(enemyAttacks[i], player)) {
                player.hurt(enemyAttacks[i].dmg); // Player hurt
                enemyAttacks[i].die(i); //Bullet death
            }
        }
    }
}