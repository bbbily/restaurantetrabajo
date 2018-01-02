SELECT * FROM jobs
WHERE  title = ANY(STRING_TO_ARRAY($1, ','));
