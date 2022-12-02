type Event = {
  id?: string;
  kind: number;
  content: string;
  tags: string[];
  created_at: EventDate;
  author?: string;
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

export class EventDate {
  private date: Date;

  constructor(date?: Date) {
    if (!date) {
      this.date = new Date();
    } else {
      this.date = date;
    }
  }

  static fromNumber(number: number) {
    return new EventDate(new Date(number * 1000));
  }

  toNumber = () => {
    return Math.floor(this.date.valueOf() / 1000);
  };

  format = () => {
    const date = this.date;
    const hour = date.getHours();
    const min = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${hour}:${min}  ${day}/${month}/${year}`;
  };
}

export type { Event, Filter };
