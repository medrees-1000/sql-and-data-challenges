DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);

INSERT INTO employees (name, department, salary) VALUES
('Alice', 'Data Science', 115000),
('Bob', 'Data Science', 95000),
('Charlie', 'Data Science', 115000),
('David', 'Engineering', 125000),
('Eva', 'Engineering', 105000);

SELECT 
    name,
    department,
    salary,
    DENSE_RANK() OVER (
        PARTITION BY department 
        ORDER BY salary DESC
    ) AS dept_salary_rank
FROM employees;