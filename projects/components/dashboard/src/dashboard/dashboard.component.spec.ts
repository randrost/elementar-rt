import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { WidgetConfig, WidgetItem } from '../types';

@Component({
  selector: 'test-widget',
  template: '<span class="rendered-widget">{{ id }}</span>'
})
class TestWidgetComponent {
  @Input() id: any;
}

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  const configs: WidgetConfig[] = [
    { type: 'test', component: () => Promise.resolve(TestWidgetComponent) }
  ];
  const items: WidgetItem[] = [
    { id: 'a', type: 'test', columns: 6 },
    { id: 'b', type: 'test', columns: 6 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardComponent, TestWidgetComponent] }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should mark itself fully loaded immediately when waitWhenAllWidgetLoaded is false', () => {
    fixture.componentRef.setInput('configs', configs);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    expect((component as any)._allLoaded()).toBe(true);
  });

  it('should wait until every widget reports loaded when waitWhenAllWidgetLoaded is true', () => {
    fixture.componentRef.setInput('configs', configs);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('waitWhenAllWidgetLoaded', true);
    fixture.detectChanges();

    expect((component as any)._allLoaded()).toBe(false);

    component.markWidgetAsLoaded('a');
    expect((component as any)._allLoaded()).toBe(false);

    component.markWidgetAsLoaded('b');
    expect((component as any)._allLoaded()).toBe(true);
  });

  it('should do nothing when there are no configs', () => {
    fixture.componentRef.setInput('configs', []);
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();

    expect((component as any)._allLoaded()).toBe(false);
  });

  it('should resolve the widget component for a rendered widget async pipe', async () => {
    fixture.componentRef.setInput('configs', configs);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const rendered = fixture.nativeElement.querySelectorAll('.rendered-widget');
    expect(rendered.length).toBe(2);
  });

  it('should look up the field def / skeleton / component maps by widget type', () => {
    fixture.componentRef.setInput('configs', configs);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    expect((component as any).getWidgetConfig('test')).toBe(configs[0]);
    expect((component as any).getWidgetInputs({ id: 'a', widget: 'payload' } as any)).toEqual({ widget: 'payload', id: 'a' });
    expect((component as any).getWidgetInputs({ id: 'a' } as any)).toEqual({ id: 'a' });
  });
});
