export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      error?: never;
    }
  | {
      success: false;
      error: string;
      data?: never;
    };

export type Paginated<T> = {
  rows: T[];
  total: number;
  page: number;
  totalPages: number;
};

export const ADMIN_PAGE_SIZE = 40;
