import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'set-fundraiser-story',
  templateUrl: './set-fundraiser-story.component.html',
  styleUrls: ['./set-fundraiser-story.component.css'],
})
  
export class SetFundraiserStoryComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  @Input() form!: FormGroup;
  @Output() next = new EventEmitter();


  constructor(private dialog: MatDialog) {
    
  }
  
  ngOnInit(): void {

  }
  
  nextStep() {
    this.next.emit(this.fundraiser);
  }
  
}

