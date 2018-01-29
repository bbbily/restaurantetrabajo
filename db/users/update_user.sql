UPDATE users
SET name = $2,
city = $3,
state = $4,
zipcode = $5,
phone = $6,
title = $7,
restaurant_exp = $8,
introduction = $9,
relocate = $10,
desired_salary = $11
WHERE email = $1
RETURNING *;
