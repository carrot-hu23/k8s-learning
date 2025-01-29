FROM openjdk:17.0.1-jdk-slim

COPY ./target/demo-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 9000
CMD ["java", "-jar", "/app.jar"]