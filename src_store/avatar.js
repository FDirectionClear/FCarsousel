// avatar.js

import avatar from '../img/类nico.jpg';

function createAvatar(){
    var img = new Image();
    document.getElementById("avatar").appendChild(img);
    img.src = avatar;
}

export default createAvatar;