UPDATE jobs
SET viewed_amount = viewed_amount + 1
WHERE id = $1
