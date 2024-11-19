using backend.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSingleton<IOrderService, OrderService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", b =>
    {
        b.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build(); 
app.MapGet("/", () => "Order Manager!");
app.MapControllers();
app.UseCors("AllowReactApp");
app.Run();