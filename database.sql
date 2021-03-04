CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

-- Favorites Table
CREATE TABLE "favorites" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR(1024) NOT NULL,
  "category_id" INT REFERENCES "category"
);

-- DEFAULT DATA
INSERT INTO "favorites" ("url")
VALUES ('https://media0.giphy.com/media/9wLKh6ms5t9qE/giphy.gif'), 
('https://media0.giphy.com/media/9wLKh6ms5t9qE/giphy.gif'), 
('https://media0.giphy.com/media/9wLKh6ms5t9qE/giphy.gif');

