create table if not exists Users (
  id serial primary key,
  fistname varchar(100),
  lastname varchar(100),
  city varchar(100),
  state varchar(100),
  zipcode varchar(100),
  phone varchar(100),
  register_date text,
  resumeUrl text,
  title varchar(100),
  restaurant_exp varchar(100),
  introduction varchar(100),
  relocate boolean,
  desired_salary varchar(20),
  posted_amount integer,
  account_type varchar(10),
  postings integer
);

create table if not exists Jobs(
  id serial primary key,
  company_name varchar(100),
  title varchar(100),
  salary varchar(100),
  street varchar(100),
  city varchar(100),
  state varchar(100),
  zipcode varchar(100),
  phone varchar(100),
  post_date text,
  experience varchar(100),
  description text
);


create table if not exists Job_applied(
  id serial primary key,
  job_id integer references Jobs(id) on delete cascade,
  user_id integer references Users(id) on delete cascade
);
