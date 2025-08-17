
export interface Student {
  id: string;
  name: string;
  contact: string;
  classDays: string[];
}

export enum Tab {
  Students = 'STUDENTS',
  Firing = 'FIRING',
}
