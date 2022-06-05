import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit {
  constructor(private snackBarService: SnackBarService) {}

  ngOnInit(): void {}

  onFormSubmit(formRef: NgForm) {
    this.snackBarService.openSnackBar('Wiadomość została wysłana!', 'Zamknij');
  }
}
