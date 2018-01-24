DROP TABLE IF EXISTS flights;

CREATE TABLE flights (
    id serial,
    flight_code text,
    departure_airport_code text,
    arrival_airport_code text,
    departure_date date,
    departure_time time,
    departure_city text,
    departure_country text,
    arrival_date date,
    arrival_time time,
    arrival_city text,
    arrival_country text,
    connection_1 text,
    connection_1_city text,
    connection_2 text,
    connection_2_city text,
    departure_airport_id int,
    arrival_airport_id int
);

INSERT INTO flights (flight_code, departure_airport_code, arrival_airport_code, departure_date, departure_time, departure_city, departure_country, arrival_date, arrival_time, arrival_city, arrival_country) VALUES
  ('FR 7755', 'TNG', 'MAD', 'February 2, 2018', '13:20', 'Tangier', 'MO', 'February 2, 2018', '15:40', 'Madrid', 'ES'),
  ('FR 7754', 'MAD', 'TNG', 'January 31, 2018', '12:25', 'Madrid', 'ES', 'January 31, 2018', '12:55', 'Tangier', 'US');
  ('AA 68', 'MIA', 'MAD', 'January 24, 2018', '12:55', 'Miami', 'US', 'January 25, 2018', '9:30', 'Madrid', 'ES'),
  ('AA 69', 'MAD', 'MIA', 'February 4, 2018', '08:15', 'Madrid', 'US', 'February 4, 2018', '5:55', 'Miami', 'US');

flight_code, departure_date, departure_time, departure_city, departure_country, arrival_date, arrival_time, arrival_city, arrival_city,

flight_code,
departure_airport_code,
arrival_airport_code,
departure_date,
departure_time,
departure_city,
departure_country,
arrival_date,
arrival_time,
arrival_city,
arrival_country,
connection_1,
connection_1_city,
connection_2,
connection_2_city,
departure_airport_id,
arrival_airport_id

id serial,
flight_code text,
departure_airport_code text,
arrival_airport_code text,
departure_date date,
departure_time time,
departure_city text,
departure_country text,
arrival_date date,
arrival_time time,
arrival_city text,
arrival_country text,
connection_1 text,
connection_1_city text,
connection_2 text,
connection_2_city text,
departure_airport_id int,
arrival_airport_id int
