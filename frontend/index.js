// Current ChatRoom, default is general
var selectedChatRoom = "general";

/**
 * changeChatRoom will update the value of selectedChatRoom and also notify the server that it changes chatroom
 */
function changeChatRoom() {
    // Change Header to reflect the changed chatroom
    var newChatRoom = document.getElementById("chatroom");
    if(newChatRoom !== null && newChatRoom.value !== selectedChatRoom) {
        console.log(newChatRoom);
    }
    return false;
}

class Event {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}

function routeEvent(event) {
    if(event.type === undefined) {
        alert("no 'type' field in event");
    }
    switch(event.type) {
        case "new_message": 
            console.log("new message");
            break;
        default:
            alert("unsupported message type");
            break;
    }
}

function sendMessage() {
    var new_message = document.getElementById("message");
    if(new_message !== null) {
        sendEvent("send_message", new_message.value);
    }
    return false;
}

function sendEvent(event_name, payload) {
    const event = new Event(event_name, payload);
    conn.send(JSON.stringify(event));
}

window.onload = function () {
    // document.getElementById("chatroom-selection").onsubmit = changeChatRoom;
    document.getElementById("chatroom-message").onsubmit = sendMessage;

    if(window["WebSocket"]) {
        console.log("Websocket supported.");
        conn = new WebSocket("ws://" + document.location.host + "/ws")

        // add a listener to the onmessage event
        conn.onmessage = function (evt) {
            console.log(evt);
            const event_data = JSON.parse(evt.data);
            const event = Object.assign(new Event, event_data);
            routeEvent(event);
        }
    } else {
        alert("Not supporting websocket.")
    }
}
