import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AutocompleteManyFieldComponent } from './autocomplete-many-field.component';

describe('AutocompleteManyFieldComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [AutocompleteManyFieldComponent],
      providers: [provideHttpClient()],
    });
    const fixture = TestBed.createComponent(AutocompleteManyFieldComponent);
    fixture.componentRef.setInput('control', new FormControl(''));
    fixture.componentRef.setInput('config', { name: 'ac', type: 'autocomplete', kind: 'field', label: 'AC', payload: {} } as any);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
