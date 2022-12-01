export const marking = {
    X:'X',
    U:'U',
    O:'O',
}
export class TicTacToeGame{
    constructor(){
        this.turn = marking.X;
        this.moves = 0;
        this.winner = null;
        this.board = []
        for(let i=0;i<9;i++){
            this.board.push(marking.U)
        }
        this.status = "Ready to Play";
    }
    toogleTurns(){
        this.turn = this.turn == marking.X ? marking.O : marking.X;
    }

    checkRow(n){
        if(this.board[n*3]!=marking.U 
            && this.board[n*3]==this.board[n*3+1]
            && this.board[n*3]==this.board[n*3+2]){
                return this.board[n*3]
        }else{
            return null;
        }
    }

    setWinner(){
        for(let i=0;i<3;i++){
            this.winner = this.checkCol(i);
            if(this.winner!=null){
                return;
            }
            this.winner = this.checkRow(i);
            if(this.winner!=null){
                return;
            }
            this.winner=this.checkDiagonal1();
            if(this.winner!=null){
                return;
            }
            this.winner=this.checkDiagonal2();
            if(this.winner!=null){
                return;
            }
            if(this.moves==9){
                this.winner = marking.U;
                return
            }
            this.winner = null;
        }
    }

    checkCol(n){
        if(this.board[n]!=marking.U 
            && this.board[n]==this.board[n+3]
            && this.board[n]==this.board[n+6]){
                return this.board[n]
        }else{
            return null;
        }
    }

    checkDiagonal1(){
        if(this.board[2]!=marking.U
            && this.board[2] == this.board[4]
            && this.board[2] == this.board[6]){
                return this.board[2];
            }else{
                return null;
            }
    }


    checkDiagonal2(){
        if(this.board[0]!=marking.U
            && this.board[0] == this.board[4]
            && this.board[0] == this.board[8]){
                return this.board[0];
            }else{
                return null;
            }
    }

}