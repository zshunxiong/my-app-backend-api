CREATE TABLE people (
 id serial PRIMARY KEY,
 name VARCHAR(100),
 age INTEGER NOT NULL,
 email text UNIQUE NOT NULL,
 added TIMESTAMP NOT NULL
)