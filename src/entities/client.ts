export interface IProducts {
  title: string;
  id: number;
  price: number;
  description: string;
  images: string[];

  category: {
    id: number;
    name: string;
    image: string;
  };
}
