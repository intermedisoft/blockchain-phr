import * as types from './../constants/ActionTypes'
// Import ภาษามา
const HTTP_STATUS_CODES = {
  'CODE200': 'OK',
  'CODE201': 'Created',
  'CODE202': 'Accepted',
  'CODE203': 'Non-Authoritative Information',
  'CODE204': 'No Content',
  'CODE205': 'Reset Content',
  'CODE206': 'Partial Content',
  'CODE300': 'Multiple Choices',
  'CODE301': 'Moved Permanently',
  'CODE302': 'Found',
  'CODE303': 'See Other',
  'CODE304': 'Not Modified',
  'CODE305': 'Use Proxy',
  'CODE307': 'Temporary Redirect',
  'CODE400': 'Bad Request',
  'CODE401': 'Unauthorized',
  'CODE402': 'Payment Required',
  'CODE403': 'Forbidden',
  'CODE404': 'Not Found',
  'CODE405': 'Method Not Allowed',
  'CODE406': 'Not Acceptable',
  'CODE407': 'Proxy Authentication Required',
  'CODE408': 'Request Timeout',
  'CODE409': 'Conflict',
  'CODE410': 'Gone',
  'CODE411': 'Length Required',
  'CODE412': 'Precondition Failed',
  'CODE413': 'Request Entity Too Large',
  'CODE414': 'Request-URI Too Long',
  'CODE415': 'Unsupported Media Type',
  'CODE416': 'Requested Range Not Satisfiable',
  'CODE417': 'Expectation Failed',
  'CODE500': 'Internal Server Error',
  'CODE501': 'Not Implemented',
  'CODE502': 'Bad Gateway',
  'CODE503': 'Service Unavailable',
  'CODE504': 'Gateway Timeout',
  'CODE505': 'HTTP Version Not Supported'
}

export const ActionErrHandle = function (dispatch, error) {
  if (!error.response) {
    dispatch({
      type: types.ERROR_MESSAGE.NETWORKERROR,
      message: 'Network Error, Please contact Admin'
    })
    return false
  }

  const code = error.response.status
  const rscode = 'CODE'.concat(code)
  let message = error.value || error.message || 'Unknown Fail'

  if (HTTP_STATUS_CODES[rscode]) {
    message = HTTP_STATUS_CODES[rscode]
  }
  dispatch({
    type: types.ERROR_MESSAGE[rscode],
    message: message
  })
}
