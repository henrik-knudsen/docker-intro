# Running Containers (with Docker)

There are two primary ways to run docker containers, with `docker run` and `docker compose up`. 

![](./readme-assets/docker-run-compose.jpeg)

Docker run takes a single container image and runs a container based on it, while docker compose takes a specification of 1 or more services and can build container images for them and/or run containers from those images.

Generally `docker run` is preferable for one off quick use cases (for example those described in `01-running-3rd-party-containers`) while docker compose is preferable if you are developing a containerized application with more than one service.

## individual docker run commands


In order to build the images, we can run the following commands:

```powershell
docker build -t client-react-ngnix -f 03-building-container-images/client-react/Dockerfile.5 02-demo-web-application/client-react/

docker build -t api-node -f 03-building-container-images/api-node/Dockerfile.7 02-demo-web-application/api-node/

docker build -t api-golang -f 03-building-container-images/api-golang/Dockerfile.6 02-demo-web-application/api-golang/

docker build -t api-dotnet -f 03-building-container-images/api-dotnet/Dockerfile.6 02-demo-web-application/api-dotnet/
```

In order to run the images as containers in a network, we can run the following commands:


```powershell
# Set DATABASE_URL environment variable

$env:DATABASE_URL="postgres://postgres:foobarbaz@db:5432/postgres"

# Create network for containers

docker network create my-network

# Start Database container

docker run -d --name db --network my-network -e POSTGRES_PASSWORD=foobarbaz -v pgdata:/var/lib/postgresql/data -p 5432:5432 --restart unless-stopped postgres:15.1-alpine

# Start API containers

docker run -d --name api-node --network my-network -e DATABASE_URL=${DATABASE_URL} -p 3000:3000 --restart unless-stopped api-node

docker run -d --name api-golang --network my-network -e DATABASE_URL=${DATABASE_URL} -p 8080:8080 --restart unless-stopped api-golang

docker run -d --name api-dotnet --network my-network -e DATABASE_URL="Server=db;Port=5432;User Id=postgres;Password=foobarbaz;Database=postgres" -p 5181:5181 --restart unless-stopped api-dotnet

# Start Client containers

docker run -d --name client-react-vite --network my-network -p 80:8080 --restart unless-stopped client-react-vite


```

***Note:*** Because the Dockerfiles and application source code are located in different directories, the build commands appear more complicated than they actually are. Generally the Dockerfile would live alongside the application and the command would be more like `docker build -t <TAG> .` (and docker defaults to choosing the Dockerfile in the local directory).

You will notice that each of the run commands has a bunch of options used to ensure the configuration works properly.

- Uses the default docker bridge network
- Publishing ports (`-p` option) useful to connect to each service individually from host, but only necessary to connect to the frontend
- Named containers make it easier to reference, but does require removing them to avoid naming conflict
- Restart policy allows docker to restart the container (for example if database weren't up yet causing one of the api servers to crash)

## docker compose

Using docker compose allows encoding all of the logic from the `docker build` and `docker run` commands into a single file. Docker compose also manages naming of the container images and containers, attaching to logs from all the containers at runtime, etc...

As you can see, this is much simpler than needing to execute all of the individual build/run commands and provides a clear way to specify the entire application stack in a single file!

# Important Configuration Options

The example shows many configuration options, but does not cover them all.

Documentation: https://docs.docker.com/engine/reference/run/.

All of the command line flags/options can also be specified them within a compose file: https://docs.docker.com/compose/compose-file/

Here are a set of options everyone should know:
```
-d
--entrypoint
--env, -e, --env-file
--init
--interactive, -i
--mount, --volume, -v
--name
--network, --net
--platform
--publish, -p
--restart
--rm
--tty, -t
```

Here are a set of less commonly used options, but still worth knowing about:

```bash
--cap-add, --cap-drop
--cgroup-parent
--cpu-shares
--cpuset-cpus (pin execution to specific CPU cores)
--device-cgroup-rule,
--device-read-bps, --device-read-iops, --device-write-bps, --device-write-iops
--gpus (NVIDIA Only)
--health-cmd, --health-interval, --health-retries, --health-start-period, --health-timeout
--memory , -m
--pid, --pids-limit
--privileged
--read-only
--security-opt
--userns
```
