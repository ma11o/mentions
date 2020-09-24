declare global {
  interface Window {
    api: Extend;
  }
}

export interface Extend {
  click: (arg: any) => void;
}