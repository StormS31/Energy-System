FROM maven:3.8.3-openjdk-17

COPY ./src/ /root/src
COPY ./pom.xml /root/
COPY ./target/backend-users.jar ROOT.jar
WORKDIR /root
RUN mvn package

ENTRYPOINT ["java", "-jar", "/ROOT.jar"]