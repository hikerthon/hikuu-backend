-- Get all event and alert in map within 3 km of user given lat,lng
DROP PROCEDURE IF EXISTS GetEventAroundMe;
DELIMITER //
CREATE PROCEDURE GetEventAroundMe(plat DECIMAL(10, 8), plng DECIMAL(11, 8))
BEGIN
    DECLARE radius FLOAT;
    DECLARE distance_unit FLOAT;
    DECLARE lat_range FLOAT;
    DECLARE lng_range FLOAT;
    SET radius = 3.0; -- in km
    SET distance_unit = 111.045; -- degree of latitude for km
    SET lat_range = radius / distance_unit;
    SET lng_range = (radius / (distance_unit * COS(RADIANS(plat))));

    START TRANSACTION;

    DROP TEMPORARY TABLE IF EXISTS temp_broadcast_around;
    CREATE TEMPORARY TABLE temp_broadcast_around(
        ptinfo VARCHAR(5),
        event_type_id INT UNSIGNED,
        alert_level_id INT UNSIGNED,
        event_info VARCHAR(255),
        latpt DECIMAL(10, 8), 
        lngpt DECIMAL(11, 8), 
        distance_mtr FLOAT, 
        logtime DATETIME
    );

    INSERT INTO temp_broadcast_around(ptinfo, event_type_id, alert_level_id, event_info, latpt, lngpt, distance_mtr, logtime)
    SELECT 'alert', event_type_id, alert_level_id, event_info, latpt, lngpt, ST_Distance_Sphere(POINT(lngpt, latpt), POINT(plng, plat)), event_time
    FROM alerts WHERE latpt BETWEEN plat - lat_range AND plat + lat_range AND lngpt BETWEEN plng - lng_range AND plng + lng_range;
    -- AND event_end > NOW();

    INSERT INTO temp_broadcast_around(ptinfo, event_type_id, alert_level_id, event_info, latpt, lngpt, distance_mtr, logtime)
    SELECT 'event', event_type_id, alert_level_id, event_info, latpt, lngpt, ST_Distance_Sphere(POINT(lngpt, latpt), POINT(plng, plat)), event_time
    FROM events WHERE latpt BETWEEN plat - lat_range AND plat + lat_range AND lngpt BETWEEN plng - lng_range AND plng + lng_range;
    -- AND (stat != 'RESOLVED' OR stat != 'BAD');

    SELECT ptinfo, et.event_type_name, al.alert_name, event_info, latpt, lngpt, distance_mtr, logtime 
    FROM temp_broadcast_around a 
    INNER JOIN alert_level al ON a.alert_level_id = al.id
    INNER JOIN event_type et ON a.event_type_id = et.id
    ORDER BY distance_mtr;

    COMMIT;
END//
DELIMITER ;