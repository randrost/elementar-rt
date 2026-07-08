import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularNodeViewComponent } from './angular-node-view.component';

describe('AngularNodeViewComponent', () => {
  let fixture: ComponentFixture<AngularNodeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AngularNodeViewComponent] }).compileComponents();
    fixture = TestBed.createComponent(AngularNodeViewComponent);
  });

  it('should accept and expose all NodeViewProps inputs', () => {
    const deleteNode = () => {};
    fixture.componentInstance.editor = {} as any;
    fixture.componentInstance.node = {} as any;
    fixture.componentInstance.deleteNode = deleteNode;
    fixture.detectChanges();

    expect(fixture.componentInstance.deleteNode).toBe(deleteNode);
  });
});
