delete from users
  where email = $1
  returning *
