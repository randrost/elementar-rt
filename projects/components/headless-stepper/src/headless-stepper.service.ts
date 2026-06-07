import { Injectable, signal, computed } from '@angular/core';

export interface HeadlessStepConfig {
  valid?: boolean;
  label?: string;
}

@Injectable()
export class EmrHeadlessStepperService {
  private _steps = signal<HeadlessStepConfig[]>([]);
  private _current = signal(0);
  private _visited = signal<Set<number>>(new Set([0]));

  readonly currentStep = this._current.asReadonly();
  readonly stepCount = computed(() => this._steps().length);
  readonly isFirst = computed(() => this._current() === 0);
  readonly isLast = computed(() => this._current() === this._steps().length - 1);
  readonly canProceed = computed(() => {
    const step = this._steps()[this._current()];
    return step?.valid !== false;
  });
  readonly visitedSteps = this._visited.asReadonly();

  configure(steps: HeadlessStepConfig[]): void {
    this._steps.set(steps);
    this._current.set(0);
    this._visited.set(new Set([0]));
  }

  setStepValid(index: number, valid: boolean): void {
    const steps = [...this._steps()];
    if (steps[index]) steps[index] = { ...steps[index], valid };
    this._steps.set(steps);
  }

  next(): boolean {
    if (!this.canProceed() || this.isLast()) return false;
    const next = this._current() + 1;
    this._current.set(next);
    const visited = new Set(this._visited());
    visited.add(next);
    this._visited.set(visited);
    return true;
  }

  prev(): boolean {
    if (this.isFirst()) return false;
    this._current.set(this._current() - 1);
    return true;
  }

  goTo(index: number): boolean {
    const steps = this._steps();
    if (index < 0 || index >= steps.length) return false;
    this._current.set(index);
    const visited = new Set(this._visited());
    visited.add(index);
    this._visited.set(visited);
    return true;
  }

  reset(): void {
    this._current.set(0);
    this._visited.set(new Set([0]));
  }

  isStepVisited(index: number): boolean { return this._visited().has(index); }
  isStepValid(index: number): boolean { return this._steps()[index]?.valid !== false; }
}
