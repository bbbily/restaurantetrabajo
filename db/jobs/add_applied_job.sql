INSERT INTO Job_applied
(job_id,
person_name,
person_city,
person_state,
person_phone)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;
