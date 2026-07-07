import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditorComponent } from './content-editor.component';

describe('ContentEditorComponent', () => {
  let fixture: ComponentFixture<ContentEditorComponent>;
  let component: ContentEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContentEditorComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with an empty value', () => {
    expect((component as any)._value()).toBe('');
  });

  it('should populate its value via writeValue', () => {
    component.writeValue('<p>Hello</p>');
    expect((component as any)._value()).toBe('<p>Hello</p>');
  });

  it('should default a null/undefined writeValue to an empty string', () => {
    component.writeValue(null as any);
    expect((component as any)._value()).toBe('');
  });

  it('should propagate content changes through the registered CVA callbacks', () => {
    const onChange = jasmine.createSpy('onChange');
    const onTouched = jasmine.createSpy('onTouched');
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    (component as any)._onContentChange('<p>New content</p>');

    expect((component as any)._value()).toBe('<p>New content</p>');
    expect(onChange).toHaveBeenCalledWith('<p>New content</p>');
    expect(onTouched).toHaveBeenCalled();
  });
});
