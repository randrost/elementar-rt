import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoundEffectDirective } from './sound-effect.directive';

@Component({
  standalone: true,
  imports: [SoundEffectDirective],
  template: `<button emrSoundEffect="assets/click.ogg"></button>`,
})
class HostComponent {
  @ViewChild(SoundEffectDirective) directive!: SoundEffectDirective;
}

describe('SoundEffectDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    // jsdom's HTMLMediaElement.play() is unimplemented and rejects; swallow it
    // so the directive's fire-and-forget `await audio.play()` doesn't surface
    // as an unhandled rejection in the test run.
    spyOn(window.HTMLMediaElement.prototype, 'play').and.returnValue(Promise.resolve());
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should play an Audio element sourced from soundSrc on click', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});
