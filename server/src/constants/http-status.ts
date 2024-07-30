// httpErrors.js

const status = {
  ok: 200,
  created: 201,
  accepted: 202,
  bad_request: 400,
  unauthorized: 401,
  payment_required: 402,
  forbidden: 403,
  not_found: 404,
  method_not_allowed: 405,
  not_acceptable: 406,
  proxy_authentication_required: 407,
  internal_server_error: 500,
  not_implemented: 501,
  bad_gateway: 502,
};

export default status;
