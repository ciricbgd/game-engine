var clock = new Date();
export var time = clock.getTime();

export function updateTime() {
    let clock = new Date();
    time = clock.getTime();
}

export function wait(timeMs) {
    return (time + timeMs);
}

export var status = 'unpaused';

export function togglePause(pauseButton){
    status=pauseButton;
}


export function checkGameStatus(){
    if(status=='paused'){
        //The game is paused
        
    }
    console.log(status);
}

