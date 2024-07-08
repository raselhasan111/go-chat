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

function sendMessage() {
    var newMessage = document.getElementById("message");
    if(newMessage !== null) {
        conn.send(newMessage.value)
    }
    return false;
}

window.onload = function () {
    // document.getElementById("chatroom-selection").onsubmit = changeChatRoom;
    document.getElementById("chatroom-message").onsubmit = sendMessage;

    if(window["WebSocket"]) {
        console.log("Websocket supported.");
        conn = new WebSocket("ws://" + document.location.host + "/ws")
    } else {
        alert("Not supporting websocket.")
    }
}
