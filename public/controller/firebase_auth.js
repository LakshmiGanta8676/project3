import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import * as Elements from "../viewpage/elements.js"
import * as Constants from "../model/constant.js"
import * as Util from "../viewpage/util.js"
import { routing } from "./route.js"
import { welcome_page } from "../viewpage/welcome_page.js"


const auth = getAuth()

export let currentUser = null;

export function addEventListners(){
    Elements.formSignin.addEventListener('submit',async (e)=>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        try{
            const userCredintial = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredintial.user
            Elements.modalSignin.hide()
            console.log(`Sign In Success`)
        }catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            Util.info("Sign In Error",JSON.stringify(error),Elements.modalSignin)
            if(Constants.DEV){
                console.log(`Sign In Error: ${errorCode} | ${errorMessage}`)
            }
        }
    })

    Elements.menus.signOut.addEventListener("click",async (e)=>{
        console.log("SignOut Button Clicked");
        try{
            await signOut(auth);
        }catch(error){
            Util.info("Sign out Error",JSON.stringify(error))
            if(Constants.DEV)
                console.log(`Sign Out Error: ${error}`)
        }
    })

    onAuthStateChanged(auth,authStateChangedObserver)
}

async function authStateChangedObserver(user){
    if(user){
        // SignedIn
        currentUser = user
        let elements = Elements.modalPreAuthElements;
        for(let i=0; i<elements.length;i++){
            elements[i].style.display = 'none';
        }
        elements = Elements.modalPostAuthElements
        for(let i=0; i<elements.length;i++){
            elements[i].style.display = 'block';
        }
        
        const pathName = window.location.pathname;
        const hash = window.location.hash
        routing(pathName,hash)
    }else{
        currentUser = null;

        let elements = Elements.modalPostAuthElements
        for(let i=0; i<elements.length;i++){
            elements[i].style.display = 'none';
        }

        elements = Elements.modalPreAuthElements
        for(let i=0; i<elements.length;i++){
            elements[i].style.display = 'block';
        }
        history.pushState(null,null,"/")
        Elements.root.innerHTML = await welcome_page()
    }
}
