export interface Book {
  id: number;
  title: string;
  description: string;
  value: number;
  cover_image: string;
  author: string;
  quantity: number;
  isPrefered: boolean;
  genre?: [string, string] | string;
  isBestSeller: boolean;
}
export interface Customer {
  name: string;
  email: string;
}

export interface BookWithPrefered {
  isPrefered: boolean;
  book: Book;
}
