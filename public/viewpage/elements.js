export const modalInfoBox = {
    modal: new bootstrap.Modal(document.getElementById("modal-infobox"),{backdrop:'static'}),
    title:document.getElementById("modal-infobox-title"),
    body:document.getElementById("modal-infobox-body")
}

export const modalSignin = new bootstrap.Modal(document.getElementById('modal-signin-form'),{backdrop:'static'})
export const formSignin = document.getElementById('form-sign-in')

export const modalPreAuthElements = document.getElementsByClassName("modal-preauth")
export const modalPostAuthElements = document.getElementsByClassName("modal-postauth")


export const menus = {
    singIn: document.getElementById('menu-signin'),
    tictactoe: document.getElementById('menu-tictactoe'),
    about: document.getElementById('menu-about'),
    signOut: document.getElementById('menu-signout')
}


export const root = document.getElementById('root')