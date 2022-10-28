FROM mariadb:10.8.2
RUN apt-get update -y
ENV MARIADB_ROOT_PASSWORD=pass
COPY my.conf /etc/mysql/conf.d
COPY schema.sql /docker-entrypoint-initdb.d/
EXPOSE 3306