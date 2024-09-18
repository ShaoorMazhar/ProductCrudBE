export function generateHexId() {
  return [...Array(24)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

export const SuccessResponse = (message, statusCode, response) => {
  return {
    status: statusCode,
    data: {
      metadata: {
        message: message,
      },
      payload: {
        data: response,
      },
    },
  };
};

export const FailureResponse = (message, statusCode) => {
  return {
    status: statusCode,
    data: {
      metadata: {
        message: message,
      },
    },
  };
};
