import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, getDoc, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

const db = getFirestore();

const TicTacToeGame_Collection = "tictactoe_game"

export async function addTicTacToeGameHistory(gamePlay) {
  await addDoc(collection(db, TicTacToeGame_Collection), gamePlay)
}

export async function getTicTacToeGameHistory(email) {
  let history = []
  const q = query(collection(db, TicTacToeGame_Collection), where('email', '==', email), orderBy(
    'timestamp', 'desc'
  ))
  const snapShot = await getDocs(q);
  snapShot.forEach(doc => {
    const {email,winner,moves,timestamp} = doc.data()
    history.push({email,winner,moves,timestamp})
  })
  return history;
}