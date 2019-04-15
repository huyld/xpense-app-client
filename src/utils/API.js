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
