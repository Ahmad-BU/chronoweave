
export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  MIXED = 'MIXED',
}

export interface Entry {
  id: number;
  date: Date;
  content: string;
  sentiment: Sentiment;
  themes: string[];
  position: { x: number; y: number };
}

export interface Insight {
  echo: {
    title: string;
    description: string;
  };
  ripple: {
    title: string;
    description: string;
  };
}

export interface Pathway {
  title: string;
  strategy: string;
  steps: string[];
}

export interface Goal {
  title: string;
  pathway: Pathway;
}
