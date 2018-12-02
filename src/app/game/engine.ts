var clock = new Date();
export var time = clock.getTime();

export function updateTime() {
    let clock = new Date();
    time = clock.getTime();
}

export function wait(timeMs) {
    return (time + timeMs);
}

