import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRendererComponent } from './form-renderer.component';

describe('FormRendererComponent', () => {
  let component: FormRendererComponent;
  let fixture: ComponentFixture<FormRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRendererComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', { elements: [], layout: { columns: 1, gap: '0', children: [] } } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
