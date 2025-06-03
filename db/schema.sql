DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    birthday date ,
    salary integer
)


