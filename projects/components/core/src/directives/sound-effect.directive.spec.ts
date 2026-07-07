import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoundEffectDirective } from './sound-effect.directive';

@Component({
  standalone: true,
  imports: [SoundEffectDirective],
  template: `<div emrSoundEffect></div>`,
})
class HostComponent {
  @ViewChild(SoundEffectDirective) directive!: SoundEffectDirective;
}

describe('SoundEffectDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });
});
