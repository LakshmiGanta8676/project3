import * as Auth from "./controller/firebase_auth.js"
import * as AboutPage from "./viewpage/about_page.js"
import * as TicTacToePage from "./viewpage/tictactoe_page.js"
import { routing } from "./controller/route.js";


Auth.addEventListners()
AboutPage.addEventListeners()
TicTacToePage.addEventListeners()


window.onload = ()=>{
    const pathName = window.location.pathname
    const hashName = window.location.hash;
    routing(pathName,hashName)
}

window.addEventListener("popstate",(event)=>{
    event.preventDefault();
    const pathName = event.target.location.pathName;
    const hash = event.target.location.hash;
    routing(pathName,hash)
})
