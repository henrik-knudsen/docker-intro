# Sample web application

![](readme-assets/app-image.PNG)


## Minimal 3 tier web application
- **React frontend:** Uses react query to load data from the three apis and display the result
- **.NET, Node JS and Golang APIs:** All have `/` and `/ping` endpoints. `/` queries the Database for the current time, and `/ping` returns `pong`
- **Postgres Database:** An empty PostgreSQL database with no tables or data. Used to show how to set up connectivity. The API applications execute `SELECT NOW() as now;` to determine the current time to return.

![](./readme-assets/tech-stack.png)

## Running the Application

While the whole point of this course is that you probably won't want/need to run the application locally.

Here are a set of commands to get things running.

### Postgres

It's way more convenient to run postgres in a container than install and run locally, so we will do that.

```bash
docker run -e POSTGRES_PASSWORD=foobarbaz -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:15.1-alpine
```

### api-dotnet

To run the dotnet api you will need to run the `api-dotnet` project (requires .NET 7 installation). This can be done via:

```
dotnet run --project .\api-dotnet\
```

or using your favorite IDE (Rider / VS).

### api-node

To run the node api you will need to run `npm install` to install the dependencies (I used node `v19.4.0` and npm `v9.2.0`).

After installing the dependencies, `npm run dev` will run the api in development mode with nodemon for restarting the app when you make source code changes.

The API expects an environment variable `DATABASE_URL` to be set. Using powershell:

```pwsh
$env:DATABASE_URL="postgres://postgres:foobarbaz@localhost:5432/postgres"
```

### api-golang 

To run the golang api you will need to run `go mod download` to download and install the dependencies (I used `go1.19.1`)

After installing the dependencies, `go run main.go` will build and run the api.

The API expects an environment variable `DATABASE_URL` to be set. Using powershell:

```pwsh
$env:DATABASE_URL="postgres://postgres:foobarbaz@localhost:5432/postgres"
```

### client-react

Like `api-node`, you will first need to install the dependencies with `npm install` (again, I used node `v19.4.0` and npm `v9.2.0`)

After installing the dependencies, `npm run dev` will use vite to run the react app in development mode.