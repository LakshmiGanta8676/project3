
export async function welcome_page() {
    const response = await fetch("/viewpage/templates/welcome.html",{cache:'no-store'}) 
    let html = await response.text() 
    return html;
}