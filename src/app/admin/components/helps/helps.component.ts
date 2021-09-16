import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminHelpService } from '../../services/admin-help/admin-help.service';
import { Help } from '../../../models/help.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';



@Component({
  selector: 'admin-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.scss']
})
export class HelpsComponent implements OnInit, OnDestroy {
  showForm = false;
  helpSub?: Subscription;
  helps: Help[] = [];
  helpToEdit?: Help;
  mode='create';

  constructor(
    private helpService: AdminHelpService,
    private snackBar: MatSnackBar,
    private snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.getAllHelps();
  }

  toggleForm(){
    this.mode='create'; 
    this.showForm=!this.showForm;
  }

  // get all the helps
  getAllHelps() {
    this.helpSub = this.helpService
      .getAllHelps().subscribe(
        (helps: Help[]) => {
          this.helps = helps;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        },
      )
  }

  createHelp(help:Help) {
    this.helpSub = this.helpService
      .createHelp(help)
      .subscribe(
        (newHelp) => {
          this.helps.unshift(newHelp);
          console.log('created');
          this.showForm=false;
          this.snackBar.open(
            'Help created!','Close', this.snackbarService.getConfig()
          )
        }
        ,
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
  }


  //  delete a help -> optimistic
  deleteHelp(help: Help) {
    let index = this.helps.indexOf(help);
    this.helps.splice(index, 1);
    this.helpSub = this.helpService
      .deleteHelp(help)
      .subscribe(
        () => {
          this.snackBar.open(
            'Help deleted!','Close', this.snackbarService.getConfig()
          )        }
        ,
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.helps.unshift(help);
        }
      );
  }

  // edit a help
  editHelp(help: Help){
    console.log(help);
    let id=help._id;
    delete help._id;// not allowed to be submitted to the server
    this.helpSub = this.helpService
    .editHelp(id!,help)
    .subscribe(
      (newHelp) => {
        this.helps.unshift(newHelp);
        console.log('created');
        this.showForm=false;
        this.snackBar.open(
          'Help edited!','Close', this.snackbarService.getConfig()
        )
      }
      ,
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.helps.unshift(help);
      }
    );    
  }

  openForm(help: Help){
    this.showForm=true;
    this.mode='edit'
    this.helpToEdit=help;
  }

  ngOnDestroy(): void {
    this.helpSub?.unsubscribe();
  }
}
