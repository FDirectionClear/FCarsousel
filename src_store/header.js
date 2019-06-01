function Header(le){
    var contents = document.getElementById("contents");
    var h = document.createElement("h3");
        contents.appendChild(h).innerText = "你是谁？";
}

// function Header(){
//     console.log("我是Header");
// }

export default Header;