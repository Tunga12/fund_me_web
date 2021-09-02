import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Help } from 'src/app/models/help.model';

@Component({
  selector: 'admin-help-form',
  templateUrl: './help-form.component.html',
  styleUrls: ['./help-form.component.css']
})
export class HelpFormComponent implements OnInit,OnDestroy {
  @Output() createHelp = new EventEmitter();
  @Output() editHelp = new EventEmitter();
  @Input() mode: string = 'create';
  @Input() help?: Help;

  form!: FormGroup;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['bullet_list'],
    ['text_color'],
    ['image'],
    ['ordered_list'],
    ['link'],
    ['background_color']
  ];

  help_types=[
  'Getting Started',
  "Account management",
  "Money management",
  "Donor questions",
  "Common issues",
  "Safety & security"
];


  constructor(
    private fb: FormBuilder,
  ) {
    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(5)]],
        category:['', Validators.required],
        content: ['', [Validators.required, Validators.minLength(10)]]
      }
    );
    this.help&&this.mode==='edit' ? this.form.patchValue(this.help) : "";
  }
  //create help
  complete() {
    this.mode.toLowerCase() === 'edit' ?
      this.editHelp.emit({ ...this.form.value, _id: this.help?._id }) : this.createHelp.emit(this.form.value);
  }


  /** getters and setters for form controls */
  public get content(): AbstractControl | null {
    return this.form.get('content');
  }

  public get title(): AbstractControl | null {
    return this.form.get('title');
  }
  
  public get category(): AbstractControl | null {
    return this.form.get('category');
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
