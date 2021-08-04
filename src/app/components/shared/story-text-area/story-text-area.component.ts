import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'story-text-area',
  templateUrl: './story-text-area.component.html',
  styleUrls: ['./story-text-area.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StoryTextAreaComponent implements OnInit, OnDestroy {
  @Input() form!: FormGroup;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    [ 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center'],
  ];

  constructor() {
    this.editor = new Editor();
  }


  ngOnInit(): void {
    // this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
