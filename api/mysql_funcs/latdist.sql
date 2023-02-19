
-- https://www.movable-type.co.uk/scripts/latlong.html
CREATE OR REPLACE FUNCTION haversine_distance(
     lat_1 DOUBLE,
     lon_1 DOUBLE,
     lat_2 DOUBLE,
     lon_2 DOUBLE )
RETURNS DOUBLE
BEGIN
    DECLARE earthRadius DOUBLE;
    DECLARE pi180 DOUBLE;
    DECLARE lat1Pi180 DOUBLE;
    DECLARE lat2Pi180 DOUBLE;
    DECLARE latDiff DOUBLE;
    DECLARE lonDiff DOUBLE;

    DECLARE a DOUBLE;
    DECLARE c DOUBLE;
    SET pi180 = PI() / 180;
    SET earthRadius = 6371e3;
    SET lat1Pi180 = lat_1 * pi180;
    SET lat2Pi180 = lat_2 * pi180;

    SET latDiff = (lat_2 - lat_1) * pi180;
    SET lonDiff = (lon_2 - lon_1) * pi180;

    SET a = sin(latDiff/2) * sin(lonDiff / 2) + cos(lat1Pi180) * cos(lat2Pi180) * sin(lonDiff/2) * sin(lonDiff/2);
    SET c = 2 * atan2(sqrt(a), sqrt(1-a));

    RETURN ROUND((earthRadius * c) / 1000, 3);
end;
