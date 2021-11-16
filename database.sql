
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "hands" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"optimal" BOOLEAN,
	"hand_score" DECIMAL,
	"hand_id_str" VARCHAR(16),
	"crib_id_str" VARCHAR(16),
	"timestamp" TIMESTAMPTZ DEFAULT NOW()
);
