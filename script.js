let draggableElement = document.getElementById("draggable-elem");

let initialX = 0,
    initialY = 0;

let moveElement = false;

//Event Object

let events = {
    mouse : {
        down : "mousedown",
        move : "mousemove",
        up : "mouseup",
    },
    touch : {
        down : "touchstart",
        move : "touchmove",
        up : "touchend",
    },
};

let deviceType = "";

//Detech touch device

const isTouchDevice = () => {
    try{
        //We try to create TouchEvent (it would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

//Start(Mouse down / touch start)
draggableElement.addEventListener(events[deviceType].down, (e) => {
    e.preventDefault();

    //initial x and y points
    initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

    //Start Movement
    moveElement = true;
});

//Move
draggableElement.addEventListener(events[deviceType].move, (e)=>{
    //if movement == true then set top and left to new X and Y while removing any offset
    if(moveElement) {
        e.preventDefault();
        let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
        let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
        draggableElement.style.top = draggableElement.offsetTop - (initialY - newY) + "px";
        draggableElement.style.left = draggableElement.offsetLeft - (initialX - newX) + "px";
        initialX = newX;
        initialY = newY;
    }
});


//mouse up / touch end

draggableElement.addEventListener(events[deviceType].up,(stopMovement = (e) => {
    moveElement = false;
    })
);

draggableElement.addEventListener("mouseleave", stopMovement);
draggableElement.addEventListener(events[deviceType].up, (e)=> {
    moveElement = false;
})