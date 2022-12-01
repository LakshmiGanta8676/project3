import { about_page } from "../viewpage/about_page.js"
import { tictactoe_page } from "../viewpage/tictactoe_page.js"

export const routePath = {
    TICTACTOE: "/tictactoe",
    ABOUT: "/about"
}

export const routes = [
    {path:routePath.TICTACTOE,page: tictactoe_page},
    {path:routePath.ABOUT,page: about_page}
]


export function routing(pathName,hash){
    const route = routes.find(element => element.path == pathName)
    if(route) {
        if(hash && hash.length > 1){
            route.page(hash.substring(1))
        }else{
            route.page()
        }
    }
    else{
        routes[0].page()
    }
}