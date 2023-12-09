namespace Server.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger) 
        { 
            _next = next;   
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception err)
            {
                _logger.LogError(err, err.Message);
                context.Response.StatusCode = 500;
                context.Response.WriteAsync(ex.Message);
                return;
            }
        }
    }
}
