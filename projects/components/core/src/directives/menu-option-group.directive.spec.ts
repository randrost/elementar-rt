import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';

import { MenuOptionGroupDirective } from './menu-option-group.directive';

@Component({
  standalone: true,
  imports: [MenuOptionGroupDirective, MatOption, FormsModule],
  template: `
    <div emrMenuOptionGroup [(ngModel)]="selected">
      <mat-option value="a">A</mat-option>
      <mat-option value="b">B</mat-option>
    </div>
  `,
})
class HostComponent {
  selected: string | null = null;
  @ViewChild(MenuOptionGroupDirective) directive!: MenuOptionGroupDirective;
}

describe('MenuOptionGroupDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should select the matching option when writeValue is called', () => {
    fixture.componentInstance.directive.writeValue('b');
    fixture.detectChanges();
    const options = fixture.componentInstance.directive.options();
    expect(options[1].selected).toBe(true);
    expect(options[0].selected).toBe(false);
  });

  it('should update the bound value when an option is selected', () => {
    const options = fixture.componentInstance.directive.options();
    options[0].select();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toBe('a');
  });
});
