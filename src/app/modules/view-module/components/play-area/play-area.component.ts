import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { WordCheckService } from 'src/app/modules/controller/services/word-check.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-play-area',
  imports: [MatGridListModule, CommonModule, MatInputModule, MatToolbarModule, MatButtonModule],
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyBoardEvent($event)'
  }
})
export class PlayAreaComponent implements OnInit {

  constructor(private checkWord: WordCheckService) { }

  ngOnInit(): void {
  }
  letter: any;
  isDisabled: boolean = true;
  rowCount = [1, 2, 3, 4, 5, 6];
  colCount = [1, 2, 3, 4, 5];
  letterCount = 0;
  currChance = 0;
  totalChances = 6;
  chancesLeft = this.totalChances - this.currChance;
  currInputElement: any;
  currLetterPos = 0;
  todaysWord = "world";
  fullMatch: boolean = false;
  invalidWord: boolean = false;

  handleKeyBoardEvent(event: KeyboardEvent) {
    let pattern: RegExp = /^[A-Za-z]$/;
    switch (event.key) {
      case "Enter":
        if (this.currLetterPos == 5) {
          this.moveToNextForm();
        }
        break;
      case "Backspace":
        this.removeLetterFromInput();
        break;
      default:
        if (pattern.test(event.key)) {
          this.letter = event.key;
          if (this.currLetterPos < 5) {
            this.assignLetterToInput(this.letter);
          }
        }
    }
  }

  async moveToNextForm() {
    let word = "";
    for (let i = 1; i <= 5; i++) {
      word += (<HTMLInputElement>document.getElementById("form" + this.currChance + "input" + i)).value;
    }
    await this.wordGuess(word);
    if (this.fullMatch) {
      for (let i = 1; i <= 5; i++) {
        let target = this.getParentNodeOfInput((<HTMLInputElement>document.getElementById("form" + this.currChance + "input" + i)));
        target.classList.add("green-bg");
      }
      console.log("Win");
      window.alert('congrats!!!');
      this.enableOrDisableSubmitButton();
    } else if (this.invalidWord) {
      console.log("Word not valid");
    } else {
      this.currChance++;
      this.currLetterPos = 0;
      this.enableOrDisableSubmitButton();
    }

  }

  async wordGuess(word: any) {
    try {
      const res = await firstValueFrom(this.checkWord.isValidWord(word))
      this.checkWordIfRightWord(word)
    } catch (error) {
      this.notAValidWord();
      window.alert('not a valid word');
    }
  }
  notAValidWord() {
    this.invalidWord = true;
  }
  checkWordIfRightWord(word: any) {
    if (this.todaysWord.toLowerCase() === word.toLowerCase()) {
      this.fullMatch = true;
    } else {
      this.wordAccuracy();
    }
  }
  wordAccuracy() {
    for (let i = 1; i <= 5; i++) {
      let target = this.getParentNodeOfInput((<HTMLInputElement>document.getElementById("form" + this.currChance + "input" + i)));
      if ((<HTMLInputElement>document.getElementById("form" + this.currChance + "input" + i)).value.toLowerCase() == this.todaysWord.toLowerCase().charAt(i - 1)) {
        target.classList.add('green-bg');
      } else if (this.todaysWord.toLowerCase().includes((<HTMLInputElement>document.getElementById("form" + this.currChance + "input" + i)).value.toLowerCase())) {
        target.classList.add('yellow-bg');
      } else {
        target.classList.add('red-bg');
      }
    }
  }
  getParentNodeOfInput(target:any) {
    while ( target && ! target.classList.contains( "mat-form-field" ) ) {
      target = target.parentElement;
    }
    return target;
  }

  assignLetterToInput(letter: any) {
    if (this.currChance == 0) {
      this.currChance += 1;
    }
    this.currLetterPos++;
    (<HTMLInputElement>document.getElementById("form" + this.currChance + "input" + this.currLetterPos)).value = letter;
    if (this.currLetterPos == 5) {
      this.enableOrDisableSubmitButton();
    }
  }
  removeLetterFromInput() {
    if (this.currLetterPos > 0) {
      (<HTMLInputElement>document.getElementById("form" + this.currChance + "input" + this.currLetterPos)).value = "";
      if (this.currLetterPos == 5) {
        this.enableOrDisableSubmitButton();
      }
      this.currLetterPos--;
    }
  }
  enableOrDisableSubmitButton() {
    this.isDisabled = !this.isDisabled;
  }
}


