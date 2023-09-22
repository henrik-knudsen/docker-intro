# docker-intro


## TODO

- Add .NET most used alternatives in examples
- Show integration with vscode etc.
- 






Introduction to Docker workshop.

NB: Content is **heavily** based on DevOps Directive Docker Course by Sid Palas:
- [Youtube](https://www.youtube.com/watch?v=RqTEHSBrYFw)
- [Github](https://github.com/sidpalas/devops-directive-docker-course)

Give him a star and/or a like for his hard work :) (His youtube channel is great source for DevOps educational content). 

## Installation and Set Up

Docker Desktop: https://docs.docker.com/get-docker/

Docker Engine: https://get.docker.com/ 

---

### Configuring Docker Desktop

The default settings are likely fine for getting started, but if you begin to run more intensive applications, you may want to adjust the resources available to Docker. This can be done within the settings panel in the GUI.

![](./readme-assets/docker-desktop-config.jpg)

---

### Running Your First Containers

Hello World:
```
docker run docker/whalesay cowsay "Hello world! 🐳"
```

Run Microsoft SQL Server:
```
docker run --env "ACCEPT_EULA=Y" --env "MSSQL_SA_PASSWORD=Password123!" --publish 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
```

Should be able to connect to the database, using User: sa, Password: Password123!, on localhost:1433.