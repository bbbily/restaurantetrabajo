SELECT * FROM jobs
WHERE  title = ANY(STRING_TO_ARRAY($1, ','))
and salary = $2
and location = $3
