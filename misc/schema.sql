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
    selfie_path VARCHAR(255), 
    identity_path VARCHAR(255), 
    gender ENUM('M', 'F'), 
    dob DATE, 
    addr VARCHAR(255), 
    email VARCHAR(255), 
    nationality VARCHAR(255), 
    id_number VARCHAR(255),
    home_number VARCHAR(255), 
    mobile_number VARCHAR(255), 
    satellite_number VARCHAR(255), 
    emergency_contact VARCHAR(255), 
    emergency_number VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS stations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    station_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS permits (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    permit_name VARCHAR(255)
);

INSERT INTO permits VALUES
(1, 'Yushan National Park Permit'),
(2, 'Taroko National Park Permit'),
(3, 'Shei-Pa National Park Permit');

CREATE TABLE IF NOT EXISTS trails (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    trail_name VARCHAR(255), 
    permit INT UNSIGNED, 
    FOREIGN KEY (permit) REFERENCES permits(id)
);

INSERT INTO trails VALUES
(1, 'Yushan trails', 1),
(2, 'Qilai trails', 2),
(3, 'Zhuilu trails', 2),
(4, 'Nanhu trails', 2),
(5, 'Xuejian trails', 3),
(6, 'Daba trails', 3);

CREATE TABLE IF NOT EXISTS alert_level (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alert_name VARCHAR(255),
    alert_ttl TIME, -- default time to live 
    alert_radius DECIMAL(5, 2) -- default radius in km to notify hiker
);

INSERT INTO alert_level VALUES
(1, 'Information', '6:00:00', 5),
(2, 'Caution', '12:00:00', 7),
(3, 'Danger', '24:00:00', 10),
(4, 'Emergency', '48:00:00', -1);

CREATE TABLE IF NOT EXISTS event_type (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_type_name VARCHAR(255), -- WILD_ANIMAL, BLOCKED_ROUTE, BROKEN_STRUCTURE ETC
    event_type_desc VARCHAR(255),
    default_alert INT UNSIGNED, 
    FOREIGN KEY (default_alert) REFERENCES alert_level(id)
);

INSERT INTO event_type VALUES
(1, 'Animal', 'Wild/stray animal spotted nearby the trail', 1),
(2, 'Item Found', 'Item dropped on trail', 1),
(3, 'Blocked Route', 'Anything that blocking the trail route', 2),
(4, 'SOS', 'SOS', 4);

CREATE TABLE IF NOT EXISTS hikes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hiker_id INT UNSIGNED, 
    hike_start DATETIME,
    hike_end DATETIME,
    permit_id INT UNSIGNED,
    guide_name VARCHAR(255), 
    guide_contact VARCHAR(255),
    guide_contact2 VARCHAR(255), 
    permit_accepted ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
    accepted_time DATETIME,
    memo VARCHAR(255), 
    hike_started BOOLEAN DEFAULT FALSE, 
    hike_finished BOOLEAN DEFAULT FALSE, 
    hike_cancelled BOOLEAN DEFAULT FALSE,
    logtime DATETIME,
    FOREIGN KEY (hiker_id) REFERENCES account(id),
    FOREIGN KEY (permit_id) REFERENCES permits(id)
);

CREATE TABLE IF NOT EXISTS hike_destination (
    hike_id INT UNSIGNED, 
    trail_id INT UNSIGNED, 
    FOREIGN KEY (trail_id) REFERENCES trails(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id)
);

-- track history hold history data of each tracker entry
-- used for statistic data along with hikes table
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

-- tracker holds current location of every hiker
-- create trigger to insert to track_history after inserting to tracker
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
    PRIMARY KEY (hiker_id), 
    FOREIGN KEY (hiker_id) REFERENCES account(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id),
    INDEX(latpt, lngpt)
);

CREATE TABLE IF NOT EXISTS events (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_type_id INT UNSIGNED,
    alert_level_id INT UNSIGNED,
    event_info VARCHAR(255), 
    event_time DATETIME, 
    hike_id INT UNSIGNED,
    latpt DECIMAL(10, 8), 
    lngpt DECIMAL(11, 8), 
    radius DECIMAL(5, 2), 
    reporter INT UNSIGNED, 
    stat ENUM('PENDING', 'PROCESSING', 'RESOLVED', 'BAD'),
    logtime DATETIME, 
    FOREIGN KEY (event_type_id) REFERENCES event_type(id),
    FOREIGN KEY (alert_level_id) REFERENCES alert_level(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id), 
    FOREIGN KEY (reporter) REFERENCES account(id),
    INDEX(latpt, lngpt)
);

CREATE TABLE IF NOT EXISTS event_attachment (
    event_id INT UNSIGNED, 
    image_path VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS alerts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_type_id INT UNSIGNED,
    alert_level_id INT UNSIGNED,
    event_info VARCHAR(255), 
    event_time DATETIME, 
    permit_id INT UNSIGNED,
    latpt DECIMAL(10, 8), 
    lngpt DECIMAL(11, 8), 
    radius DECIMAL(5, 2), -- if value = -1, to be broadcasted to everyone who have the same permit_id
    creator INT UNSIGNED, 
    origin_source INT UNSIGNED DEFAULT NULL, -- event_id if alert came from event
    ttl TIME,
    is_active BOOLEAN,
    logtime DATETIME, 
    FOREIGN KEY (event_type_id) REFERENCES event_type(id),
    FOREIGN KEY (alert_level_id) REFERENCES alert_level(id),
    FOREIGN KEY (permit_id) REFERENCES permits(id), 
    FOREIGN KEY (creator) REFERENCES stations(id),
    FOREIGN KEY (origin_source) REFERENCES events(id),
    INDEX(latpt, lngpt)
);

CREATE TABLE IF NOT EXISTS alert_attachment (
    alert_id INT UNSIGNED, 
    image_path VARCHAR(255)
);