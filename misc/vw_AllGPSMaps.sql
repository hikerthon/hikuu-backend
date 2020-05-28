DROP VIEW IF EXISTS AllGpsMaps;

CREATE VIEW AllGpsMaps AS
SELECT 'hiker' ptinfo, '-' etype, 'Information' alevel, latpt, lngpt, 0 radius, record_time logtime FROM tracker a 
INNER JOIN hikes b ON a.hike_id=b.id 
WHERE b.hike_finished=0
-- AND logtime >= DATE_SUB(NOW(), INTERVAL 3 HOUR)
UNION ALL
SELECT 'alert' ptinfo, b.event_type_name etype, c.alert_name alevel, latpt, lngpt, radius, event_time logtime FROM alerts a
INNER JOIN event_type b ON a.event_type_id=b.id
INNER JOIN alert_level c ON a.alert_level_id=c.id
-- WHERE event_end >= NOW()
UNION ALL 
SELECT 'event' ptinfo, b.event_type_name etype, c.alert_name alevel, latpt, lngpt, radius, event_time logtime FROM events a
INNER JOIN event_type b ON a.event_type_id=b.id
INNER JOIN alert_level c ON a.alert_level_id=c.id;
-- WHERE stat IN ('PENDING', 'PROCESSING');