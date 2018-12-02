export var hpBar: any;

export function init(hpBarParam) {
    hpBar = hpBarParam;
}

export function updateHp(hp) {
    hpBar.innerHTML = hp;
}