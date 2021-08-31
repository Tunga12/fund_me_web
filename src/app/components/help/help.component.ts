import { Component, OnInit, OnDestroy } from '@angular/core';
import { Help } from 'src/app/models/help.model';
import { HelpService } from 'src/app/services/help/help.service';
import { Subscription } from 'rxjs';
interface HelpCategory{
  title:string,
  description:string,
  imageSrc:string
}
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent{
    
  help_categories:HelpCategory[]=[
    {
      imageSrc:"assets/images/get-started.svg",
     title: "Getting started",
     description: "Welcome! Learn how to get started on your fundraising journey here."
    },
    {
      imageSrc:"assets/images/account-mgmt.svg",
     title: "Account management",
     description: "Everything you need to run your campaign and make changes to your account."
    },
    {
      imageSrc:"assets/images/money-mgmt.svg",
     title: "Money management",
     description: "How to withdraw or refund money raised for individuals, organizations, and charities.."
    },
    {
      imageSrc:"assets/images/donor.svg",
     title: "Donor questions",
     description: "Helpful information before and after making a donation."
    },
    {
      imageSrc:"assets/images/common-issues.svg",
     title: "Common issues",
     description: "Solutions and troubleshooting tips."
    },
    {
      imageSrc:"assets/images/security.svg",
     title: "Safety & security",
     description: "Learn about the Legas Guarantee and why we are the safest place to give online.."
    },
  ]

}
