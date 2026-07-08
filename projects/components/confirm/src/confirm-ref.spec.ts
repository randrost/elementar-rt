import { ConfirmRef } from './confirm-ref';

describe('ConfirmRef', () => {
  let ref: ConfirmRef;

  beforeEach(() => {
    ref = new ConfirmRef();
  });

  it('should emit closed on close()', () => {
    let closed = false;
    ref.closed.subscribe(() => (closed = true));
    ref.close();
    expect(closed).toBe(true);
  });

  it('should emit canceled then closed on cancel()', () => {
    const events: string[] = [];
    ref.canceled.subscribe(() => events.push('canceled'));
    ref.closed.subscribe(() => events.push('closed'));
    ref.cancel();
    expect(events).toEqual(['canceled', 'closed']);
  });

  it('should emit confirmed then closed on confirm()', () => {
    const events: string[] = [];
    ref.confirmed.subscribe(() => events.push('confirmed'));
    ref.closed.subscribe(() => events.push('closed'));
    ref.confirm();
    expect(events).toEqual(['confirmed', 'closed']);
  });
});
