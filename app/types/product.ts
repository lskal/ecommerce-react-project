/* main response fetch */
export interface IProductsResponse {
  products?: IProduct[];
  total?: number;
  skip?: number;
  limit?: number;
  filter?: string;
}
/* main response fetch */

/* single product */
export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;

  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;

  tags: string[];

  brand: string;

  sku: string;
  weight: number;

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;

  reviews: IReview[];

  returnPolicy: string;
  minimumOrderQuantity: number;

  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };

  thumbnail: string;
  images: string[];
}

export interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
/* single product */

/* option params query from https://dummyjson.com/docs/products */
export interface IProductsFetchParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  category?: string;
  search?: string;
}
/* option params query from https://dummyjson.com/docs/products */
