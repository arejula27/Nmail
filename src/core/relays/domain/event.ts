type Event = {
  kind: number;
  content: string;
  tags: string[];
};

type Filter = {
  ids?: string[];
  kinds?: number[];
  authors?: string[];
  since?: number;
  until?: number;
  "#e"?: string[];
  "#p"?: string[];
};

export type { Event, Filter };
