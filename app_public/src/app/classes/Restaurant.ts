export class Restaurant {
  _id: string;
  name: string;
  address: string;
  rating: number;
  mealPrice: number;
  student: boolean;
  studentPrice: number;
  timeTable: {
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
    sunday: string
  };
  comments: string;
  icon: string;
  front: string;
  description: string;
}
