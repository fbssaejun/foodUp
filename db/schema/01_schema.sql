DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS menu_rating CASCADE;



CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  customer BOOLEAN DEFAULT TRUE,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  post_code VARCHAR(255) NOT NULL
);

CREATE TABLE menu_items(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  kalories INTEGER,
  cuisine VARCHAR(255),
  available BOOLEAN DEFAULT FALSE
);

CREATE TABLE orders(
  id SERIAL PRIMARY KEY NOT NULL,
  accepted BOOLEAN DEFAULT FALSE,
  basket BOOLEAN DEFAULT TRUE,
  ordered_at TIMESTAMP,
  completed_at TIMESTAMP,
  instructions TEXT,
  total_price INTEGER,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items(
  id SERIAL PRIMARY KEY NOT NULL,
  quantity INTEGER NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
);

CREATE TABLE menu_rating(
  id SERIAL PRIMARY KEY NOT NULL,
  rating INTEGER,
  message TEXT,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
