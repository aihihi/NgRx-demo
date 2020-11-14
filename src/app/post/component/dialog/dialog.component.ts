import {Component, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'dialog-post',
  templateUrl: 'dialog.component.html',
})
export class DialogPost {
    dialogTitle: String;
    dialogContent: String;

    constructor(
       
        @Inject(MAT_DIALOG_DATA) data) {

        this.dialogTitle = data.title;
        this.dialogContent = data.content;
    }
}
