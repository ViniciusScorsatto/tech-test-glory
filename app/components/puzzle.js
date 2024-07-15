import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PuzzleComponent extends Component {

 @tracked currentState = [1,2,3,4,5,6,7,8,0]
 @tracked pieceToMove = ''
 @tracked message = ''

 swapPiecePosition(pieceSelected){
    let emptyIndex = this.currentState.indexOf(0);
    let pieceSelectedIndex = this.currentState.indexOf(pieceSelected);

    if (pieceSelectedIndex === -1){
        this.message = "Invalid Piece"
        this.pieceToMove = ''
        return
    }

    if (this.canPieceMove(pieceSelectedIndex)){
        [this.currentState[emptyIndex], this.currentState[pieceSelectedIndex]]=[this.currentState[pieceSelectedIndex],this.currentState[emptyIndex]];
        this.currentState = [...this.currentState];
    }else{
        this.message = "Cannot Move this piece";
    }

    this.pieceToMove = ''
 }

 canPieceMove(pieceSelectedIndex){
    let emptyIndex = this.currentState.indexOf(0);

    //Went for a more direct approach, definitely there is a more elaborate way 
    const validMoves = {
        0: [1,3],
        1: [0,2,4],
        2: [1,5],
        3: [0,4,6],
        4: [1,3,5,7],
        5: [2,4,8],
        6: [3,7],
        7: [4,6,8],
        8: [5,7],
    };
    
    return validMoves[emptyIndex].includes(pieceSelectedIndex);
 }

 @action
 movePiece(){
    this.message = '';
    this.swapPiecePosition(parseInt(this.pieceToMove, 10));
 }

 @action
 updatePieceEntry(event){
    this.pieceToMove = event.target.value;
 }



}
