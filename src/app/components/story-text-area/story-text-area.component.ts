import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'story-text-area',
  templateUrl: './story-text-area.component.html',
  styleUrls: ['./story-text-area.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StoryTextAreaComponent implements OnInit, OnDestroy {
  initial_data = '';

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl(
      { value: this.initial_data, disabled: false },
      Validators.required()
    ),
  });

  constructor() {
    this.editor = new Editor();
  }

  get doc(): AbstractControl | null {
    return this.form.get('editorContent');
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
