export interface IPagination {
  /**
   * Current page number.
   */
  current_page: number;
  /**
   * Last page number.
   */
  last_page: number;
  /**
   * On current page count items.
   */
  per_page: number;
  /**
   * Count all items.
   */
  total: number;
}
