import { IPagination, IResponsePagination } from 'src/renderer/common/List/interface';

export function extractPagination({ total, per_page, current_page, last_page }: IResponsePagination<any>): IPagination {
  return { total, per_page, current_page, last_page };
}

export const defaultPagination = { last_page: 0, current_page: 0, per_page: 0, total: 0 };
