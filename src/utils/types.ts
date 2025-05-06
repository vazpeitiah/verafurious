export type Employee = {
  id: string;
  name: string;
  ordinal: number;
};

export type CalendarItem = {
  begin: Date;
  end: Date;
  employee: Employee;
  isCurrentWeek: boolean;
};
