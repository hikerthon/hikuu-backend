DROP DATABASE IF EXISTS hikoo;
CREATE DATABASE hikoo;
USE hikoo;
ALTER DATABASE hikoo CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS account (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(255),
    userpwd VARCHAR(255),
    first_name VARCHAR(255), 
    last_name VARCHAR(255),
    gender ENUM('M', 'F'), 
    dob DATE, 
    addr VARCHAR(255), 
    email VARCHAR(255), 
    nationality VARCHAR(255), 
    id_number VARCHAR(255),
    mobile_number VARCHAR(255), 
    satellite_number VARCHAR(255), 
    emergency_contact VARCHAR(255), 
    emergency_number VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS stations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    station_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS mountains (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    mountain_name VARCHAR(255), 
    station_jurisdiction INT UNSIGNED, 
    FOREIGN KEY (station_jurisdiction) REFERENCES stations(id)
);

CREATE TABLE IF NOT EXISTS alert_level (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alert_name VARCHAR(255),
    alert_ttl TIME,
    alert_radius DECIMAL(5, 2)
);

INSERT INTO alert_level VALUES
(1, 'misc', '6:00:00', 3),
(2, 'info', '9:00:00', 5),
(3, 'warn', '12:00:00', 7),
(4, 'sos', '24:00:00', -1);

CREATE TABLE IF NOT EXISTS events (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255), -- WILD_ANIMAL, BLOCKED_ROUTE, BROKEN_STRUCTURE ETC
    event_desc VARCHAR(255),
    default_alert INT UNSIGNED, 
    FOREIGN KEY (default_alert) REFERENCES alert_level(id)
);

INSERT INTO events VALUES
(1, 'Wild Animal', 'Wild animal on hiking trail', 2),
(2, 'Item dropped', 'Other hikers belonging that dropped on trail', 1),
(3, 'Blocked Route', 'Anything that blocking the route', 3),
(4, 'SOS', 'SOS', 4);

CREATE TABLE IF NOT EXISTS hikes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hiker_id INT UNSIGNED, 
    request_time DATETIME,
    hike_start DATETIME,
    hike_end DATETIME,
    mountain_id INT UNSIGNED,
    permit_accepted BOOLEAN,
    accepted_time DATETIME,
    logtime DATETIME,
    FOREIGN KEY (hiker_id) REFERENCES account(id),
    FOREIGN KEY (mountain_id) REFERENCES mountains(id)
);

CREATE TABLE IF NOT EXISTS track_history (
    hiker_id INT UNSIGNED, 
    hike_id INT UNSIGNED, 
    record_time DATETIME, 
    latpt DECIMAL(10, 8), 
    lngpt DECIMAL(11, 8), 
    elevation DECIMAL(8, 3), 
    battery TINYINT, 
    network SMALLINT, 
    elapsed_time TIME, 
    logtime DATETIME, 
    PRIMARY KEY (hike_id, hiker_id, record_time), 
    FOREIGN KEY (hiker_id) REFERENCES account(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id),
    INDEX(latpt, lngpt)
);

-- create trigger to upsert to tracker after inserting to track_history
CREATE TABLE IF NOT EXISTS tracker (
    hiker_id INT UNSIGNED, 
    hike_id INT UNSIGNED, 
    record_time DATETIME, 
    latpt DECIMAL(10, 8), 
    lngpt DECIMAL(11, 8), 
    elevation DECIMAL(8, 3), 
    battery TINYINT, 
    network SMALLINT, 
    elapsed_time TIME, 
    logtime DATETIME,
    PRIMARY KEY (hike_id, hiker_id), 
    FOREIGN KEY (hiker_id) REFERENCES account(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id),
    INDEX(latpt, lngpt)
);

CREATE TABLE IF NOT EXISTS broadcast (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    mountain_id INT UNSIGNED,
    is_broadcast BOOLEAN, 
    event_id INT UNSIGNED,
    alert_id INT UNSIGNED,
    event_info VARCHAR(255), 
    event_time DATETIME, 
    latpt DECIMAL(10, 8), 
    lngpt DECIMAL(11, 8), 
    radius DECIMAL(5, 2), -- if value = -1, to be broadcasted to everyone in mountain_id
    reporter INT UNSIGNED, 
    report_time DATETIME,
    ttl TIME,
    is_active BOOLEAN,
    logtime DATETIME, 
    FOREIGN KEY (mountain_id) REFERENCES mountains(id), 
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (alert_id) REFERENCES alert_level(id),
    FOREIGN KEY (reporter) REFERENCES account(id),
    INDEX(latpt, lngpt)
);