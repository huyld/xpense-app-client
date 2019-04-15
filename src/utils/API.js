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
