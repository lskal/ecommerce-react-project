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

export interface IProductsResponse {
  products?: IProduct[];
  total?: number;
  skip?: number;
  limit?: number;
  filter?: string;
}

// TODO: find usage
export interface ProductsQueryParams {
  limit?: number;
  skip?: number;
  select?: string; // e.g. "title,price"
  sortBy?: string; // e.g. "title"
  order?: "asc" | "desc";
}
