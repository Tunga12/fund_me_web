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
  styleUrls: ['./story-text-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StoryTextAreaComponent implements OnDestroy {
  @Input() form!: FormGroup;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    [ 'bullet_list'],
    ['text_color'],
  ];

  constructor() {
    this.editor = new Editor();
  }


  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
