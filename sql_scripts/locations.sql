DROP TABLE IF EXISTS checkins;

CREATE TABLE checkins (
    id serial,
    location_name text,
    location_area text,
    address text,
    coordinates text,
    arrival_time time,
    arrival_date date,
    notes text,
    location_type text
);

INSERT INTO checkins (location_name, location_area, address, coordinates, arrival_time, arrival_date, notes, location_type) VALUES
  ('Home', 'Detroit, MI', '', '', '16:40', '2017-12-10', 'Still Home', 'home'),
  ('Detroit Airport', 'Romulus, MI', '', '', '18:40', '2017-12-10', 'Getting on the plane, thanks TSA Precheck!', 'airport'),
  ('Madrid International Airport', 'Madrid, ES', '', '', '09:40', '2017-12-11', 'My phone works', 'airport'),
  ('Cocina Sucia', 'Madrid, ES', '', '', '10:41', '2017-12-10', 'I think this place has roaches', 'restaurant');
  ('FR 7755', 'TNG', 'MAD', 'February 2, 2018', '13:20', 'Tangier', 'MO', 'February 2, 2018', '15:40', 'Madrid', 'ES'),
  ('FR 7754', 'MAD', 'TNG', 'January 31, 2018', '12:25', 'Madrid', 'ES', 'January 31, 2018', '12:55', 'Tangier', 'US');
  ('AA 68', 'MIA', 'MAD', 'January 24, 2018', '12:55', 'Miami', 'US', 'January 25, 2018', '9:30', 'Madrid', 'ES'),
  ('AA 69', 'MAD', 'MIA', 'February 4, 2018', '08:15', 'Madrid', 'US', 'February 4, 2018', '5:55', 'Miami', 'US');

flight_code, departure_date, departure_time, departure_city, departure_country, arrival_date, arrival_time, arrival_city, arrival_city,

location_name,
location_area,
address,
coordinates,
arrival_time,
arrival_date,
notes,
location_type
