// Error de negocio con código HTTP asociado (los servicios NO conocen req/res,
// solo lanzan estos errores; el controlador decide cómo responder).
class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const badRequest = (msg) => new AppError(msg, 400);
const notFound = (msg) => new AppError(msg, 404);
const conflict = (msg) => new AppError(msg, 409);

module.exports = { AppError, badRequest, notFound, conflict };
