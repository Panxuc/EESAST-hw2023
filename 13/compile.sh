# add.cpp
docker build -t add --build-arg FILENAME=add --build-arg NUM1=114 --build-arg NUM2=514 .
docker run --rm --name add-container add

# mul.cpp
docker build -t mul --build-arg FILENAME=mul --build-arg NUM1=114 --build-arg NUM2=514 .
docker run --rm --name mul-container mul

# 通过 `docker logs` 查看运行结果
docker logs add-container
docker logs mul-container
