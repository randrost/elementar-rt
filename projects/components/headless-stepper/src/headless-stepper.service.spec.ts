import { EmrHeadlessStepperService } from './headless-stepper.service';

describe('EmrHeadlessStepperService', () => {
  let service: EmrHeadlessStepperService;

  beforeEach(() => {
    service = new EmrHeadlessStepperService();
    service.configure([{ label: 'One' }, { label: 'Two' }, { label: 'Three', valid: false }]);
  });

  it('should start on the first step with only it visited', () => {
    expect(service.currentStep()).toBe(0);
    expect(service.isFirst()).toBe(true);
    expect(service.isStepVisited(0)).toBe(true);
    expect(service.isStepVisited(1)).toBe(false);
  });

  it('should advance to the next step and mark it visited', () => {
    const advanced = service.next();
    expect(advanced).toBe(true);
    expect(service.currentStep()).toBe(1);
    expect(service.isStepVisited(1)).toBe(true);
  });

  it('should not advance past the last step', () => {
    service.goTo(2);
    const advanced = service.next();
    expect(advanced).toBe(false);
    expect(service.currentStep()).toBe(2);
  });

  it('should not advance when the current step is marked invalid', () => {
    service.setStepValid(0, false);
    expect(service.canProceed()).toBe(false);
    expect(service.next()).toBe(false);
  });

  it('should go back to the previous step', () => {
    service.next();
    const moved = service.prev();
    expect(moved).toBe(true);
    expect(service.currentStep()).toBe(0);
  });

  it('should not go back before the first step', () => {
    expect(service.prev()).toBe(false);
  });

  it('should jump directly to a valid index via goTo', () => {
    expect(service.goTo(2)).toBe(true);
    expect(service.currentStep()).toBe(2);
    expect(service.isLast()).toBe(true);
  });

  it('should reject an out-of-range goTo index', () => {
    expect(service.goTo(99)).toBe(false);
    expect(service.currentStep()).toBe(0);
  });

  it('should reset back to the first step and clear visited history', () => {
    service.goTo(2);
    service.reset();
    expect(service.currentStep()).toBe(0);
    expect(service.isStepVisited(2)).toBe(false);
  });

  it('should report per-step validity via isStepValid', () => {
    expect(service.isStepValid(2)).toBe(false);
    expect(service.isStepValid(0)).toBe(true);
  });
});
