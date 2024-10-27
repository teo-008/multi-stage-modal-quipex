export const STAGE = {
  GettingStarted: 'GettingStarted',
  AddBuilding: 'AddBuilding',
  AddBuildingConfirmation: 'AddBuildingConfirmation',
} as const;

export type Stage = keyof typeof STAGE;

export const NON_STAGE = {
  End: 'End',
} as const;

export type NonStage = keyof typeof NON_STAGE;

export const EXIT_OPTIONS = {
  Later: 'Later',
  Save: 'Save',
} as const;

export type ExitOptions = keyof typeof EXIT_OPTIONS;

export interface MachineState<T> {
  on: { previous?: T; next: T | NonStage };
  title: string;
  options: {
    exit: ExitOptions;
  };
}

export interface Machine<T extends string> {
  initial: T;
  states: Record<T, MachineState<T>>;
}
