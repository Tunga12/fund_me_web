import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    // selected language
    selectedLanguage?: string;
  constructor() { }

  ngOnInit(): void {
        // get the selected language
        this.selectedLanguage = localStorage.getItem('lang') || 'en';
  }

  changeLang(event: any) {
    let lang = event.value;
    this.selectedLanguage = lang;
    console.log(this.selectedLanguage);
    localStorage.setItem('lang', lang);
    location.reload();
  }

}
