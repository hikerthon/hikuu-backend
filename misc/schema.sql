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
(1, 'tonylin', 'iliketopoo', 'Tony', 'Lin', '/selfie/tonylin', '/identity/tonylin', 'M', '2000-01-01', 'Taoyuan, St.Somewhere No.99', 'tonylin@gmail.com', 'Taiwan', 'AB12345', '0965-123-4567', '0965-123-4567', '0965-123-4567', 'Emma Watson', '0965-123-4567'),
(2, 'tonymadden', 'iliketoeat', 'Tony', 'Madden', '/selfie/tonymadden', '/identity/tonymadden', 'M', '2000-01-01', 'Taipei, St.Around there No.88', 'tonymadden@gmail.com', 'Taiwan', 'O223782019', '0965-777-8888', '0965-777-8888', '0965-777-8888', 'Rachel Weize', '0965-777-8888'),
(3, 'jerrylee', 'iliketosleep', 'Jerry', 'Lee', '/selfie/jerrylee', '/identity/jerrylee', 'M', '2000-01-01', 'Hsinchu, St.That area No.77', 'jerrylee@gmail.com', 'Taiwan', 'O223782019', '0965-777-8888', '0965-777-8888', '0965-777-8888', 'Margot Robbie', '0965-777-8888'),
(4, 'nyotoyang', 'iliketofart', 'Nyoto', 'Yang', '/selfie/nyotoyang', '/identity/nyotoyang', 'M', '2000-01-01', 'Hsinchu, St.This area No.66', 'nyotoyang@gmail.com', 'Indonesia', 'O223782019', '0965-777-8888', '0965-777-8888', '0965-777-8888', 'Emma Stone', '0965-777-8888'),
(5, 'mrchuck', 'ilikeme', 'Chuck', 'Norris', '/selfie/mrchuck', '/identity/mrchuck', 'M', '2000-01-01', 'Navasota, St.Those area No.88', 'mrchuck@gmail.com', 'United States', 'O223782019', '0965-777-8888', '0965-777-8888', '0965-777-8888', 'Gena O-Kelley', '0965-777-8888'),
(6, 'mrstallone', 'ilikemyself', 'Sylvester', 'Stallone', '/selfie/mrstallone', '/identity/mrstallone', 'M', '2000-01-01', 'California, St.These area No.88', 'mrstallone@gmail.com', 'United States', 'O223782019', '0965-777-8888', '0965-777-8888', '0965-777-8888', 'Jennifer Flavin', '0965-777-8888');

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
    event_type_name VARCHAR(255),
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
    hike_started BOOLEAN DEFAULT FALSE, 
    hike_finished BOOLEAN DEFAULT FALSE, 
    hike_cancelled BOOLEAN DEFAULT FALSE,
    logtime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hiker_id) REFERENCES account(id),
    FOREIGN KEY (permit_id) REFERENCES permits(id)
);

INSERT INTO hikes VALUES
(1, 1, '2020-05-11 07:00', '2020-05-12 17:00', 1, 'Chuck Noris', '0965-999-9999', '0965-888-8888', 'ACCEPTED', '2020-05-10 08:00', 'We will hike like a beast', TRUE, TRUE, FALSE, '2020-05-09 08:00'),
(2, 1, '2020-05-25 07:00', '2020-05-29 17:00', 2, 'Sylvester Stallone', '0965-999-9999', '0965-888-8888', 'ACCEPTED', '2020-05-21 08:00', 'We will hike like a soldier', TRUE, FALSE, FALSE, '2020-05-22 08:00'),
(3, 1, '2020-06-08 07:00', '2020-06-10 17:00', 3, 'Stephen Chow', '0965-999-9999', '0965-888-8888', 'REJECTED', '2020-05-21 09:00', 'I hope i can go home with my limb still attached', FALSE, FALSE, FALSE, '2020-05-20 08:00'),
(4, 2, '2020-05-28 07:00', '2020-05-29 17:00', 1, 'Jason Statham', '0965-999-9999', '0965-888-8888', 'PENDING', '2020-05-21 09:00', 'Will stay at camping ground', FALSE, FALSE, FALSE, '2020-05-20 08:00'),
(5, 5, '2020-05-11 07:00', '2020-05-12 17:00', 1, 'Myself', '0965-999-9999', '0965-888-8888', 'ACCEPTED', '2020-05-10 08:00', 'We will hike like a beast', TRUE, TRUE, FALSE, '2020-05-09 08:00'),
(6, 6, '2020-05-25 07:00', '2020-05-29 17:00', 2, 'Myself', '0965-999-9999', '0965-888-8888', 'ACCEPTED', '2020-05-21 08:00', 'We will hike like a soldier', TRUE, FALSE, FALSE, '2020-05-22 08:00'),
(7, 3, '2020-05-25 07:00', '2020-05-29 17:00', 2, 'Sylvester Stallone', '0965-999-9999', '0965-888-8888', 'ACCEPTED', '2020-05-10 08:00', 'We will hike like a beast', TRUE, TRUE, FALSE, '2020-05-09 08:00'),
(8, 4, '2020-05-25 07:00', '2020-05-29 17:00', 2, 'Sylvester Stallone', '0965-999-9999', '0965-888-8888', 'ACCEPTED', '2020-05-10 08:00', 'We will hike like a beast', TRUE, TRUE, FALSE, '2020-05-09 08:00');

CREATE TABLE IF NOT EXISTS hike_destination (
    hike_id INT UNSIGNED, 
    trail_id INT UNSIGNED, 
    FOREIGN KEY (trail_id) REFERENCES trails(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id)
);

INSERT INTO hike_destination VALUES(1, 1),(1, 2),(1, 3),(2, 1),(2, 2),(3, 1),(3, 2),(4, 1),(4, 2);

CREATE TABLE IF NOT EXISTS checkin (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hiker_id INT UNSIGNED,
    hike_id INT UNSIGNED, 
    checkin_time DATETIME, 
    FOREIGN KEY (hiker_id) REFERENCES account(id),
    FOREIGN KEY (hike_id) REFERENCES hikes(id)
);

INSERT INTO checkin VALUES
(1, 1, 1, '2020-05-11 05:00'),
(2, 5, 1, '2020-05-11 05:00'),
(3, 1, 2, '2020-05-25 06:00'),
(4, 3, 7, '2020-05-25 06:00'),
(5, 4, 8, '2020-05-25 06:00'),
(6, 6, 6, '2020-05-25 06:00');

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

DROP TRIGGER IF EXISTS be4_ins_tracker;
DELIMITER //
CREATE TRIGGER be4_ins_tracker BEFORE INSERT ON tracker FOR EACH ROW
BEGIN
    INSERT INTO track_history(hiker_id, hike_id, record_time, latpt, lngpt, elevation, battery, network, elapsed_time, logtime)
    VALUES(NEW.hiker_id, NEW.hike_id, NEW.record_time, NEW.latpt, NEW.lngpt, NEW.elevation, NEW.battery, NEW.network, NEW.elapsed_time, NEW.logtime);
END//
DELIMITER ;

INSERT INTO tracker VALUES
    (1, 1, '2020-05-11 05:00', 23.4739179,120.9001783, 2609.0, 95, -67, '00:00:05', '2020-05-11 05:00:01'), -- tataka
    (5, 5, '2020-05-11 05:00', 23.4739177,120.9001780, 2609.0, 95, -67, '00:00:05', '2020-05-11 05:00:01'), -- tataka
    (1, 1, '2020-05-11 07:05', 23.4705093,120.9178661, 2867.0, 92, -71, '02:05:03', '2020-05-11 07:22:01'),
    (1, 1, '2020-05-11 08:05', 23.4735379,120.9154855, 3202.0, 90, -69, '03:05:07', '2020-05-11 08:05:01'), -- front head
    (1, 1, '2020-05-11 09:05', 23.46739,120.9381274, 3415.0, 86, -70, '04:05:07', '2020-05-11 09:05:01'), -- front
    (1, 1, '2020-05-11 11:05', 23.4668906,120.9465227, 3420.0, 80, -61, '06:05:07', '2020-05-11 11:05:01'), -- paiyun
    (5, 5, '2020-05-11 11:05', 23.4668907,120.9465228, 3420.0, 80, -61, '06:05:07', '2020-05-11 11:05:01'), -- paiyun
    (1, 1, '2020-05-11 12:05', 23.4716737,120.9339604, 3498.0, 72, -90, '07:05:07', '2020-05-11 12:05:01'), -- west
    (1, 1, '2020-05-11 14:05', 23.4700202,120.9551856, 3917.0, 65, -68, '09:05:07', '2020-05-11 14:05:01'), -- main
    (1, 1, '2020-05-11 15:05', 23.4824032,120.94618, 3834.0, 53, -62, '10:05:07', '2020-05-11 15:05:01'), -- east
    (5, 5, '2020-05-11 15:05', 23.4824033,120.946181, 3834.0, 53, -62, '10:05:07', '2020-05-11 15:05:01'), -- east
    (1, 1, '2020-05-11 18:05', 23.4668906,120.9465227, 3420.0, 42, -61, '13:05:07', '2020-05-11 18:05:01'), -- paiyun
    (1, 1, '2020-05-12 03:05', 23.4668906,120.9465227, 3420.0, 97, -61, '22:05:07', '2020-05-12 03:05:01'), -- paiyun
    (1, 1, '2020-05-12 08:05', 23.4877932,120.9570499, 3822.0, 84, -61, '27:05:07', '2020-05-12 08:05:01'), -- north
    (5, 5, '2020-05-12 08:05', 23.4877933,120.9570500, 3822.0, 84, -61, '27:05:07', '2020-05-12 08:05:01'), -- north
    (1, 1, '2020-05-12 09:05', 23.4909916,120.9576543, 3794.0, 81, -61, '28:05:07', '2020-05-12 09:05:01'), -- north north
    (1, 1, '2020-05-12 13:05', 23.4668906,120.9465227, 3420.0, 63, -61, '32:05:07', '2020-05-12 13:05:01'), -- paiyun
    (1, 1, '2020-05-12 17:05', 23.4735379,120.9154855, 3202.0, 41, -69, '36:05:07', '2020-05-12 17:05:01'), -- front head
    (1, 1, '2020-05-12 19:00', 23.4739179,120.9001783, 2609.0, 27, -67, '39:05:05', '2020-05-12 19:00:01'), -- tataka
    (5, 5, '2020-05-12 19:00', 23.4739178,120.9001784, 2609.0, 27, -67, '39:05:05', '2020-05-12 19:00:01'), -- tataka
    (1, 2, '2020-05-25 06:00', 24.1401054,121.286211, 3134.0, 93, -58, '00:00:05', '2020-05-25 06:00:01'), -- xiaoqilai
    (3, 7, '2020-05-25 06:00', 24.1401056,121.286221, 3134.0, 93, -58, '00:00:05', '2020-05-25 06:00:01'), -- xiaoqilai
    (4, 8, '2020-05-25 06:00', 24.1401055,121.286224, 3134.0, 93, -58, '00:00:05', '2020-05-25 06:00:01'), -- xiaoqilai
    (1, 2, '2020-05-25 10:00', 24.1177876,121.310396, 2716.0, 84, -58, '04:00:05', '2020-05-25 10:00:01'), -- heishuitang
    (3, 7, '2020-05-25 10:00', 24.1177878,121.310395, 2716.0, 84, -58, '04:00:05', '2020-05-25 10:00:01'), -- heishuitang
    (4, 8, '2020-05-25 10:00', 24.1177875,121.310394, 2716.0, 84, -58, '04:00:05', '2020-05-25 10:00:01'), -- heishuitang
    (6, 6, '2020-05-25 10:00', 24.1177877,121.3103961, 2716.0, 84, -58, '04:00:05', '2020-05-25 10:00:01') -- heishuitang
ON DUPLICATE KEY UPDATE 
    hike_id=VALUES(hike_id),
    record_time=VALUES(record_time), 
    latpt=VALUES(latpt), 
    lngpt=VALUES(lngpt), 
    elevation=VALUES(elevation), 
    battery=VALUES(battery), 
    network=VALUES(network), 
    elapsed_time=VALUES(elapsed_time), 
    logtime=VALUES(logtime);

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

DROP VIEW IF EXISTS GpsMaps;
CREATE VIEW GpsMaps AS
    SELECT 'hiker' ptinfo, 0 etype, 0 alevel, latpt, lngpt, 0 radius, logtime FROM tracker a INNER JOIN hikes b ON a.hike_id=b.id 
    WHERE b.hike_finished=0
    --AND logtime >= DATE_SUB(NOW(), INTERVAL 3 HOUR)
    UNION ALL
    SELECT 'alert' ptinfo, event_type_id etype, alert_level_id alevel, latpt, lngpt, radius, event_time logtime FROM alerts 
    --WHERE event_end >= NOW()
    UNION ALL 
    SELECT 'event' ptinfo, event_type_id etype, alert_level_id alevel, latpt, lngpt, radius, event_time logtime FROM events ;
    --WHERE stat IN ('PENDING', 'PROCESSING');