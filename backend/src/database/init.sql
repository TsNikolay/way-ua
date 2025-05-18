--  DROP TABLE route_days;
--  DROP TABLE attractions;
--  DROP TABLE weather;
--  DROP TABLE routes;
--  DROP TABLE hotels;


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_activated BOOLEAN,
    activation_link TEXT
);

CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    google_place_id TEXT UNIQUE NOT NULL,
    name VARCHAR(255),
    address TEXT,
    rating NUMERIC(2,1),
    attribution TEXT,
    photo_reference TEXT
);

CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    city VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN('planned','active','completed')),
    created_at TIMESTAMP DEFAULT NOW()
);

 CREATE TABLE IF NOT EXISTS attractions (
    id SERIAL PRIMARY KEY,
    google_place_id TEXT UNIQUE NOT NULL,
    name TEXT,
    address TEXT,
    photo_reference TEXT,
    rating NUMERIC(2,1)
);


 CREATE TABLE IF NOT EXISTS route_days (
    id SERIAL PRIMARY KEY,
    route_id INTEGER REFERENCES routes(id) ON DELETE CASCADE,
    attraction_id INTEGER REFERENCES attractions(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    time_slot VARCHAR(20) CHECK (time_slot IN ('morning', 'afternoon', 'evening')) NOT NULL,
    notes TEXT
);

 CREATE TABLE weather (
      id SERIAL PRIMARY KEY,
      route_id INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
      day INTEGER NOT NULL,
      temperature REAL NOT NULL,
      conditions TEXT NOT NULL
 );





