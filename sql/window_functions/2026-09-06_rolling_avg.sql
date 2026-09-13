DROP TABLE IF EXISTS user_transactions;

CREATE TABLE user_transactions (
    transaction_id INT,
    user_id INT,
    transaction_date DATE,
    amount NUMERIC(10, 2)
);

INSERT INTO user_transactions (transaction_id, user_id, transaction_date, amount) VALUES
(1, 101, '2026-09-01', 50.00),
(2, 101, '2026-09-02', 100.00),
(3, 101, '2026-09-03', 150.00),
(4, 101, '2026-09-04', 200.00),
(5, 102, '2026-09-01', 30.00),
(6, 102, '2026-09-02', 60.00),
(7, 102, '2026-09-03', 90.00);


SELECT user_id, 
       transaction_date, 
       
       ROUND(AVG(amount) OVER(
           PARTITION BY user_id
           ORDER BY transaction_date
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ), 2 )AS rolling_3day_avg
FROM user_transactions