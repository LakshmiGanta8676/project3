import { currentUser } from "../controller/firebase_auth.js"
import { routePath } from "../controller/route.js"
import * as Elements from "./elements.js"
import { unAuthorizedAccess } from "./unauthorized_message_page.js"
export function addEventListeners(){
    Elements.menus.about.addEventListener('click',()=>{
        history.pushState(null,null,routePath.ABOUT)
        about_page()
    })
}

export function about_page(){
    if(!currentUser){
        Elements.root.innerHTML = unAuthorizedAccess()
        return
    }

    let html = "About Page"
    Elements.root.innerHTML=html
}