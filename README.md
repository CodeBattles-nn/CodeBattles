# CodeBattles

[codebattles.ru](codebattles.ru)

[![deploy](https://github.com/doctorixx/CodeBattles/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/doctorixx/CodeBattles/actions/workflows/deploy.yml)
[![Licence](https://img.shields.io/github/license/CodeBattles-nn/CodeBattles?style=flat)](./LICENSE)
![Lines of code](https://img.shields.io/endpoint?url=https://ghloc.vercel.app/api/codebattles-nn/codebattles/badge)

![Main image](images/image1.png)

[Documentation RU](https://doctorixx.gitbook.io/codebattles/)

[Documentation EN](https://doctorixx.gitbook.io/codebattles/v/en)

## Get started

> You must to install Docker Compose to run:

```shell
docker compose up
```

> [!TIP]
> For run app in background mode add flag -d
> Example:
> ```bash
> docker compose up -d
> ```

### Tested at

| Architecture | Status |
|--------------|--------|
| x64          |    ✅   |
| aarch64      |    ✅   |
| x32          |    ❓   |


## Update 

- Pull new version of code from repository
```shell
git pull
```

- Pull docker images
```shell
docker compose pull
```

- And finally run application
```shell
docker compose up
```




## Usage

Go to [http://localhost:2500](http://localhost:2500)
___

## Open container ports

- Gateway on port 2500
- Server part on port 8001
- Frontend on port 8000
- Database on port 25565
- Redis on port 6379

___
CodeBattles, 2024