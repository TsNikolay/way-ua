-- DROP TABLE route_days;
-- DROP TABLE routes;
-- DROP TABLE hotels;
-- DROP TABLE places;


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
    price VARCHAR(100),
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    city VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    weather_summary TEXT,
    status VARCHAR(20) CHECK (status IN('planned','active','completed')),
    created_at TIMESTAMP DEFAULT NOW(),
    plan_summary TEXT
);

CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    google_place_id TEXT UNIQUE NOT NULL,
    name TEXT,
    address TEXT,
    image_url TEXT,
    description TEXT,
    rating NUMERIC(2,1),
    ticket_price TEXT
    --можливо посилання на 3D модель в майбутньому
);


CREATE TABLE route_days (
    id SERIAL PRIMARY KEY,
    route_id INTEGER REFERENCES routes(id) ON DELETE CASCADE,
    place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    time_slot VARCHAR(20) CHECK (time_slot IN ('morning', 'afternoon', 'evening')) NOT NULL,
    visit_order INTEGER NOT NULL,
    notes TEXT,
    ticket_price TEXT,
    rating NUMERIC(2,1)
);




