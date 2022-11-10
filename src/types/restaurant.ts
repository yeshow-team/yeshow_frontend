interface Restaurant {
  id: number;
  category: string;
  grade: number;
  like: number;
  menu: [
    {
      name: string;
      price: number;
      description: string;
      id: number;
    },
  ];
  review: [
    {
      userId: number;
      id: number;
      content: string;
      title: string;
      grade: number;
      date: Date;
    },
  ];
}
