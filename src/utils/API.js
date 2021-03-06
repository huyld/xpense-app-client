import { API } from 'aws-amplify';

/**
 * Post new account
 *
 * @export
 * @param {*} account
 * @returns
 */
export function postAccount(account) {
  return API.post('xpense', '/account', {
    body: account
  });
}

/**
 * Get list of accounts of authenticated user
 *
 * @export
 * @returns
 */
export function getAccounts() {
  return API.get('xpense', '/accounts');
}

/**
 * Get account detail
 *
 * @export
 * @param {string} accountId
 * @returns
 */
export function getAccount(accountId) {
  return API.get('xpense', `/accounts/${accountId}`);
}

/**
 * Update account
 *
 * @export
 * @param {*} account
 * @returns
 */
export function saveAccount(account) {
  return API.put('xpense', `/accounts/${account.accountId}`, {
    body: account
  });
}

/**
 * Delete an account
 *
 * @export
 * @param {string} accountId ID of the account to be deleted
 * @returns
 */
export function deleteAccount(accountId) {
  return API.del('xpense', `/accounts/${accountId}`);
}

/**
 * Get list of categories of authenticated user
 *
 * @export
 * @returns
 */
export function getCategories() {
  return API.get('xpense', '/categories');
}

/**
 * Post new category
 *
 * @export
 * @param {*} category
 * @returns
 */
export function postCategory(category) {
  return API.post('xpense', '/category', {
    body: category
  });
}

/**
 * Get category detail
 *
 * @export
 * @param {string} categoryId
 * @returns
 */
export function getCategory(categoryId) {
  return API.get('xpense', `/categories/${categoryId}`);
}


/**
 * Update category detail
 *
 * @export
 * @param {} category
 * @returns
 */
export function updateCategory(category) {
  return API.put('xpense', `/categories/${category.categoryId}`, {
    body: category,
  });
}

/**
 * Delete a category
 *
 * @export
 * @param {string} categoryId ID of the category to be deleted
 * @returns
 */
export function deleteCategory(categoryId) {
  return API.del('xpense', `/categories/${categoryId}`);
}

