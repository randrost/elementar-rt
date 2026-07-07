import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface VisibilityState {
  visibility: Record<string, boolean>;
}

const initialState: VisibilityState = {
  visibility: { root: true }
};

export const LayoutSidebarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    // `visibility` is the only key declared in the initial state, so patching
    // a dynamic top-level key (e.g. patchState(store, { [layoutId]: isShown }))
    // would be silently ignored by ngrx/signals for any layoutId other than
    // the one seeded up front. Keeping per-layout visibility inside a single
    // `visibility` record keeps every layoutId reactive.
    showSidebarVisibility(layoutId: string, isShown: boolean): void {
      patchState(store, {
        visibility: { ...store.visibility(), [layoutId]: isShown }
      });
    },
    isVisible(layoutId: string): boolean {
      return store.visibility()[layoutId] ?? true;
    }
  }))
);
