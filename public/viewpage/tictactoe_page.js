import { currentUser } from "../controller/firebase_auth.js"
import { routePath } from "../controller/route.js"
import { marking, TicTacToeGame } from "../model/tictactoe_game.js"
import * as Elements from "./elements.js"
import { unAuthorizedAccess } from "./unauthorized_message_page.js"
import { addTicTacToeGameHistory, getTicTacToeGameHistory } from "../controller/firestore_controller.js"
import * as Util from "../viewpage/util.js"
import * as Constants from "../model/constant.js"

export function addEventListeners() {
    Elements.menus.tictactoe.addEventListener('click', () => {
        history.pushState(null, null, routePath.TICTACTOE)
        tictactoe_page()
    })
}

let gameModel;

let screen = {
    turn: null,
    moves: null,
    buttons: null,
    images: null,
    newGameButton: null,
    historyButton: null,
    clearButton: null,
    statusMessage: null
}

const imageSource = {
    X: '/images/X.png',
    O: '/images/O.png',
    U: '/images/U.png'
}

export async function tictactoe_page() {
    if (!currentUser) {
        Elements.root.innerHTML = unAuthorizedAccess()
        return
    }
    gameModel = new TicTacToeGame();
    const response = await fetch("/viewpage/templates/tictactoe_page.html", { cache: "no-store" })
    let html = await response.text()
    Elements.root.innerHTML = html
    getScreenElements()
    addGameEvents();
    updateScreen()
}

function getScreenElements() {
    console.log("Get Screen Elements")
    screen.turn = document.getElementById("turn")
    screen.moves = document.getElementById("moves")
    screen.buttons = []
    screen.images = []
    for (let i = 0; i < 9; i++) {
        screen.buttons.push(document.getElementById(`button-${i}`));
        screen.images.push(document.getElementById(`image-${i}`));
    }
    screen.newGameButton = document.getElementById("button-new-game")
    screen.historyButton = document.getElementById("btn-history")
    screen.clearButton = document.getElementById("btn-clear")
    screen.statusMessage = document.getElementById("status-message")
}

function addGameEvents() {
    for (let i = 0; i < 9; i++) {
        screen.buttons[i].addEventListener('click', buttonPressListner)
    }

    screen.newGameButton.addEventListener("click", () => {
        gameModel = new TicTacToeGame();
        updateScreen();
    })

    screen.historyButton.addEventListener('click', historyButtonEvent)

    screen.clearButton.addEventListener('click', () => {
        gameModel.status = '';
        updateScreen()
    })

}

async function buttonPressListner(event) {
    const buttonId = event.target.id;
    const pos = buttonId[buttonId.length - 1]
    gameModel.board[pos] = gameModel.turn;
    gameModel.toogleTurns()
    gameModel.moves++;

    gameModel.setWinner();
    if (gameModel.winner != null) {
        if (gameModel.winner == marking.U) {
            gameModel.status = "Game over: Draw"
        } else {
            gameModel.status = `Game Over: Winner: ${marking[gameModel.winner]} with ${gameModel.moves} moves`
        }
        updateScreen()

        const gamePlay = {
            email: currentUser.email,
            winner: gameModel.winner,
            moves: gameModel.moves,
            timestamp: Date.now()
        }

        try {
            await addTicTacToeGameHistory(gamePlay)
            Util.info("Game Over:", gameModel.status)
        } catch (e) {
            Util.info("Game Over:", `Failed to save the gamePlay history ${e}`)
            if (Constants.DEV) {
                console.log(e)
            }
        }

    } else {
        updateScreen()
    }
}

function updateScreen() {
    screen.turn.src = imageSource[gameModel.turn]
    screen.moves.innerHTML = gameModel.moves
    for (let i = 0; i < 9; i++) {
        screen.images[i].src = imageSource[gameModel.board[i]]
        screen.buttons[i].disabled = gameModel.board[i] != marking.U || gameModel.winner != null
    }
    screen.newGameButton.disabled = gameModel.winner == null
    screen.statusMessage.innerHTML = gameModel.status
}

async function historyButtonEvent() {
    let history;
    try {
        history = await getTicTacToeGameHistory(currentUser.email)
        let html = `
        <table class="table table-success table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Winner</th>
            <th scope="col">Moves</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>`

        for(let i=0;i<history.length;i++){
            html+= `
                <tr>
                    <td>
                        ${history[i].winner == marking.U?'Draw':history[i].winner}
                    </td>
                    <td>
                        ${history[i].moves}
                    </td>
                    <td>
                        ${new Date(history.timestamp).toLocaleString()}
                    </td>
                </tr>
            `
        }
        html+=`</tbody></table>`
       
        gameModel.status = html
        updateScreen()
    } catch (error) {
        Util.info("Failed to get Game History", JSON.stringify(error))
        if (Constants.DEV) {
            console.log(error)
        }
    }
}