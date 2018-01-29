delete from Job_applied
  where id = $1
  returning *
