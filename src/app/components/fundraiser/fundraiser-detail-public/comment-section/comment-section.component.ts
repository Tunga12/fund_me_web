import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() fundraiser!:Fundraiser;
  constructor(
    private fundraiserServ: FundraiserService
  ) { }

  ngOnInit(): void {
  }

    // get the number of comments of thos fundraiser
    getNumberOfComments() {
      return this.fundraiserServ.getNumberOfComments(this.fundraiser!);
    }

}
