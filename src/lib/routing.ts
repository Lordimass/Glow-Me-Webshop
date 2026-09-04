/**
 * Get the relative path to a product page. Does not check whether that product actually exists.
 *
 * This is a very trivial helper method, it's main use is for the `maintainQueryString` functionality which allows the
 * user's locale query string parameter to carry over to product pages when modifying the window path.
 *
 * @param sku The sku of the product to fetch a path for.
 * @param maintainQueryString Whether to preserve the current search parameters in the path.
 * @returns The relative path to the page requested.
 * @example "/products/1"
 * @example "/products/1?locale=en-GB"
 */
export function getProductPagePath(
  sku: number | string,
  maintainQueryString = true,
) {
  const url = new URL(window.location.href);
  url.pathname = `/products/${sku}`;
  return url.pathname + (maintainQueryString ? url.search : "");
}
