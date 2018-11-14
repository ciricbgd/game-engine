export function collides(entity1, entity2) {
    if (entity2.w < entity1.w) {
        let temoraryEntity = entity1;
        entity1 = entity2;
        entity2 = temoraryEntity;
    }
    if (((entity1.x + entity1.w / 2 > entity2.x - entity2.w / 2 && entity1.x + entity1.w / 2 < entity2.x + entity2.w / 2) || (entity1.x - entity1.w / 2 > entity2.x - entity2.w / 2 && entity1.x - entity1.w / 2 < entity2.x + entity2.w / 2)) && ((entity1.y + entity1.h / 2 > entity2.y - entity2.h / 2 && entity1.y + entity1.h / 2 < entity2.y + entity2.h / 2) || (entity1.y - entity1.h / 2 > entity2.y - entity2.h / 2 && entity1.y - entity1.h / 2 < entity2.y + entity2.h / 2))) {
        return true;
    }
    else { return false; }
}

