
-- Create stations table

CREATE TABLE stations (
  id uuid default gen_random_uuid(),
  name varchar(500) UNIQUE NOT NULL,
  url varchar(500) NOT NULL,
  favorite boolean NOT NULL,
  CONSTRAINT stations_pkey PRIMARY KEY (id)
);

-- Insert stations

INSERT INTO stations (name, url, favorite)
VALUES
  ('105', 'https://icecast.unitedradio.it/Radio105.mp3', true),
  ('Rtl-102.5', 'https://streamingv2.shoutcast.com/rtl-1025', false),
  ('Virgin', 'https://icecast.unitedradio.it/Virgin.mp3', false),
  ('Subasio', 'https://icy.unitedradio.it/Subasio.mp3', false),
  ('Montecarlo 2', 'https://edge.singsingmusic.net/MC2.mp3', false),
  ('Rai 1', 'https://icestreaming.rai.it/1.mp3', false),
  ('Rai 2', 'https://icestreaming.rai.it/2.mp3', false),
  ('Rai 3', 'https://icestreaming.rai.it/3.mp3', false),
  ('kiss', 'https://kisskiss.fluidstream.eu/KKItalia.aac?FLID=8', false),
  ('Sport', 'https://mediahit.inmystream.it:9000/stream', false),
  ('Latte e Miele', 'https://ice02.fluidstream.net/fluid016.aac?FLID=', false),
  ('Arancia Network', 'https://stream3.xdevel.com/audio0s975447-156/stream/icecast.audio', false),
  ('Rai Tutta Italiana','http://icestreaming.rai.it/4.mp3', false),
  ('R101 Diretta','http://icecast.unitedradio.it/r101', false),
  ('RTL','http://shoutcast.rtl.it:3010/', false),
  ('RTL Best','http://shoutcast.rtl.it:3020/', false),
  ('RTL ItalianStyle','http://shoutcast.rtl.it:3030/', false),
  ('RTL Groove','http://shoutcast.rtl.it:3040/', false),
  ('RTL Lounge','http://shoutcast.rtl.it:3070/', false),
  ('RTL Radiofreccia','http://shoutcast.rtl.it:3060/', false),
  ('Zeta L’Italiana','http://shoutcast.rtl.it:3030/stream/1/', false),
  ('Kiss Kiss','http://wma08.fluidstream.net:4610/http://ice07.fluidstream.net:8080/KissKiss.mp3', false),
  ('Kiss Kiss Italia','http://wma07.fluidstream.net:3616/;stream.nsv', false),
  ('Radio Marte','http://onair18.xdevel.com:8212/', false),
  ('Giornaleradio','https://gr.fluidstream.eu/gr1.mp3', false);

-- Create user table

DROP table if exists users;
CREATE TABLE users
(
    id         uuid default  gen_random_uuid(),
    name       varchar(500) not null check (LENGTH(name) >= 3),
    email      varchar(500) unique not null CHECK (email LIKE '%_@__%.__%'),
    password   varchar(500) not null,
    role       varchar(500) not null default 'user' check (role IN ('user', 'moderator', 'admin')),
    created DATE NOT NULL DEFAULT current_timestamp
);

-- Insert test user

-- insert into users (name, email, password, role, created)
-- VALUES
-- ('Fabio','name@email.com', 'sWl7dH#`8~>4:ZA)_pGbUyVt(N\f[','admin', current_timestamp)


