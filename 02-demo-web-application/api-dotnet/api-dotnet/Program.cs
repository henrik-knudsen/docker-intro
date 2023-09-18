using Dapper;
using Npgsql;

var app = WebApplication.Create(args);

app.MapGet("/", () =>
{
    var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
    using var connection = new NpgsqlConnection(connectionString);
    var now = connection.QuerySingleOrDefault<DateTime>("SELECT NOW() as now");

    return new
    {
        Api = "dotnet",
        Now = now
    };
});

app.MapGet("/ping", () => "pong");

app.Run();