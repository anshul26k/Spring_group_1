CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

INSERT INTO users (username, email, role) VALUES ('admin', 'admin@example.com', 'ADMIN');
INSERT INTO users (username, email, role) VALUES ('jdoe', 'john.doe@example.com', 'USER');