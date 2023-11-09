FROM maven:3.8.3-openjdk-17 AS builder

COPY ./src/ /root/src
COPY ./pom.xml /root/
COPY ./target/backend-devices.jar ROOT.jar
WORKDIR /root
RUN mvn package

ENTRYPOINT ["java", "-jar", "/ROOT.jar"]