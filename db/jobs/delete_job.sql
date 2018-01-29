delete from jobs
  where id = $1
  returning *
