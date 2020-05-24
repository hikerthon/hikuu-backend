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

INSERT INTO account VALUES
(1, 'tonylin', 'iliketopoo', 'Tony', 'Lin', '/selfie/tonylin', '/identity/tonylin', 'M', '2000-01-01', 'Taoyuan, St.Somewhere No.99', 'tonylin@gmail.com', 'Taiwan', 'AB12345', '0965-123-4567', '0965-123-4567', '0965-123-4567', 'Annice', '0965-123-4567'),
(2, 'tonymadden', 'iliketoeat', 'Tony', 'Madden', '/selfie/tonymadden', '/identity/tonymadden', 'M', '2000-01-01', 'Taipei, St.Arounthere No.88', 'tonymadden@gmail.com', 'Taiwan', 'O223782019', '0965-777-8888', '0965-777-8888', '0965-777-8888', 'Rachel Weize', '0965-777-8888');

CREATE TABLE IF NOT EXISTS shelters (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    shelter_name VARCHAR(255),
    capacity SMALLINT,
    latpt DECIMAL(10, 8), 
    lngpt DECIMAL(11, 8)
);

INSERT INTO shelters VALUES
(1, 'Paiyun Lodge', 100, 23.4539585,120.9542283),
(2, 'Yuanfeng Cabin', 15, 23.4539585,120.9542283),
(3, 'Lele Cabin', 25, 23.5459956,120.9359691),
(4, 'Heishuitang Cabin', 8, 23.995492,120.7968085),
(5, 'Chenggong Cabin', 34, 24.1066942,121.2813432),
(6, 'Chenggong Cabin 2', 10, 24.11616, 121.31881),
(7, 'Qilai Cabin', 8, 24.1086741,121.3247684),
(8, 'Yunleng Cabin', 55, 24.39118,121.3505313),
(9, 'Nanhu Cabin', 40, 24.3531246,121.4308206),
(10, 'Qika Lodge', 130, 24.3834962,121.2840058),
(11, 'Sanliujiu Lodge', 106, 24.3843803,121.2699295),
(12, 'Cuichi Cabin', 12, 24.3853837,121.2228219);

CREATE TABLE IF NOT EXISTS stations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    station_name VARCHAR(255)
);

INSERT INTO stations VALUES
(1, 'HePing Police Station'),
(2, 'Cheng Gone Police Station');

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
(2, 'Batonggaun Traversing Trail', 1),
(3, 'South Section 2 of Central Mountains Trail', 1),
(4, 'Qilai trails', 2),
(5, 'Zhuilu trails', 2),
(6, 'Nanhu trails', 2),
(7, 'Xuejian trails', 3),
(8, 'Daba trails', 3),
(9, 'Shengleng Trail', 3);

CREATE TABLE IF NOT EXISTS alert_level (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    alert_name VARCHAR(255),
    alert_ttl TINYINT UNSIGNED, -- default time to live in hour
    alert_radius DECIMAL(5, 2) -- default radius in km to notify hiker
);

INSERT INTO alert_level VALUES
(1, 'Information', 6, 5),
(2, 'Caution', 12, 7),
(3, 'Danger', 24, 10),
(4, 'Emergency', 48, -1);

CREATE TABLE IF NOT EXISTS event_type (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_type_name VARCHAR(255), -- WILD_ANIMAL, BLOCKED_ROUTE, BROKEN_STRUCTURE ETC
    event_type_desc VARCHAR(255),
    default_alert INT UNSIGNED, 
    FOREIGN KEY (default_alert) REFERENCES alert_level(id)
);

INSERT INTO event_type VALUES
(1, 'Wild Animal', 'Wild/stray animal spotted nearby the trail', 1),
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
    checkin_id INT UNSIGNED NULL,
    hike_started BOOLEAN DEFAULT FALSE, 
    hike_finished BOOLEAN DEFAULT FALSE, 
    hike_cancelled BOOLEAN DEFAULT FALSE,
    logtime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hiker_id) REFERENCES account(id),
    FOREIGN KEY (permit_id) REFERENCES permits(id),
    FOREIGN KEY (checkin_id) REFERENCES checkin(id)
);

INSERT INTO hikes VALUES
(1, 1, '2020-06-05 07:00', '2020-06-07 17:00', 1, 'Chuck Noris', '0965-999-9999', '0965-888-8888', 'ACCEPTED', '2020-05-21 21:22:23', 'Chuck good', FALSE, FALSE, FALSE, '2020-05-20 08:00'),
(2, 2, '2020-06-05 07:00', '2020-06-07 17:00', 2, 'Rambo', '0965-999-9999', '0965-888-8888', 'PENDING', '2020-05-21 21:22:23', 'Rambo good', FALSE, FALSE, FALSE, '2020-05-20 08:00'),
(3, 1, '2020-06-05 07:00', '2020-06-07 17:00', 3, 'Stephen Chow', '0965-999-9999', '0965-888-8888', 'REJECTED', '2020-05-21 21:22:23', 'Stephen Chow no good', FALSE, FALSE, FALSE, '2020-05-20 08:00');

CREATE TABLE IF NOT EXISTS hike_destination (
    hike_id INT UNSIGNED, 
    trail_id INT UNSIGNED, 
    FOREIGN KEY (trail_id) REFERENCES trails(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id)
);

INSERT INTO hike_destination VALUES(1, 1),(1, 2),(2, 1),(2, 2),(3, 1),(3, 2);

CREATE TABLE IF NOT EXISTS checkin (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hiker_id INT UNSIGNED,
    hike_id INT UNSIGNED, 
    checkin_time DATETIME, 
    FOREIGN KEY (hiker_id) REFERENCES account(id),
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
    logtime DATETIME DEFAULT CURRENT_TIMESTAMP, 
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
    record_time DATETIME, -- time created on mobile app
    latpt DECIMAL(10, 8), 
    lngpt DECIMAL(11, 8), 
    elevation DECIMAL(8, 3), 
    battery TINYINT, 
    network SMALLINT, 
    elapsed_time TIME, 
    logtime DATETIME DEFAULT CURRENT_TIMESTAMP, -- time this record is inserted to db
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
    radius DECIMAL(5, 2), -- radius in km to broadcast from lat,lng
    reporter INT UNSIGNED, 
    stat ENUM('PENDING', 'PROCESSING', 'RESOLVED', 'BAD'),
    logtime DATETIME DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (event_type_id) REFERENCES event_type(id),
    FOREIGN KEY (alert_level_id) REFERENCES alert_level(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id), 
    FOREIGN KEY (reporter) REFERENCES account(id),
    INDEX(latpt, lngpt)
);

INSERT INTO events (id, event_type_id, alert_level_id, event_info, event_time, hike_id, latpt, lngpt, radius, reporter, stat, logtime) VALUES
(1, 1, 2, 'Herd of monkeys spotted around', '2020-05-23 15:00:00', 1, 23.46881800, 120.95448900, 3.00, 1, 'RESOLVED', '2020-05-24 10:18:10'),
(2, 1, 1, 'Herd of water buffalo spotted around', '2020-05-23 15:00:00', 1, 23.46881800, 120.95448900, 3.00, 1, 'RESOLVED', '2020-05-24 10:18:10'),
(3, 1, 3, 'A snake spotted around', '2020-05-23 15:00:00', 1, 23.46881800, 120.95448900, 3.00, 1, 'RESOLVED', '2020-05-24 10:18:10');

CREATE TABLE IF NOT EXISTS event_attachment (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- typeorm dont like table without PK
    event_id INT UNSIGNED, 
    image_path VARCHAR(255),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS alerts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_type_id INT UNSIGNED,
    alert_level_id INT UNSIGNED,
    event_info VARCHAR(255), 
    event_time DATETIME, 
    event_end DATETIME, -- the time alert will not be shown up again
    permit_id INT UNSIGNED,
    latpt DECIMAL(10, 8), 
    lngpt DECIMAL(11, 8), 
    radius DECIMAL(5, 2), -- if value = -1, to be broadcasted to everyone who have the same permit_id
    creator INT UNSIGNED, 
    origin_source INT UNSIGNED DEFAULT NULL, -- event_id if alert came from event
    logtime DATETIME DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (event_type_id) REFERENCES event_type(id),
    FOREIGN KEY (alert_level_id) REFERENCES alert_level(id),
    FOREIGN KEY (permit_id) REFERENCES permits(id), 
    FOREIGN KEY (creator) REFERENCES stations(id),
    FOREIGN KEY (origin_source) REFERENCES events(id),
    INDEX(latpt, lngpt)
);

INSERT INTO alerts(id, event_type_id, alert_level_id, event_info, event_time, event_end, permit_id, latpt, lngpt, radius, creator, origin_source, logtime) VALUES
(1, 1, 2, 'Herd of monkeys spotted around', '2020-05-23 15:00:00', '2020-05-23 17:00:00', 1, 23.46881800, 120.95448900, 3.00, 1, NULL, '2020-05-23 16:00:00'),
(2, 1, 1, 'Herd of water buffalo spotted around', '2020-05-23 15:00:00', '2020-05-23 17:00:00', 1, 23.46881800, 120.95448900, 3.00, 1, NULL, '2020-05-23 16:00:00'),
(3, 1, 3, 'A snake spotted around', '2020-05-23 15:00:00', '2020-05-23 17:00:00', 1, 23.46881800, 120.95448900, 3.00, 1, NULL, '2020-05-23 16:00:00');

CREATE TABLE IF NOT EXISTS alert_attachment (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- typeorm dont like table without PK
    alert_id INT UNSIGNED, 
    image_path VARCHAR(255),
    FOREIGN KEY (alert_id) REFERENCES alerts(id)
);