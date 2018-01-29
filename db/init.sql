create table if not exists Users (
  id serial primary key,
  email varchar(100),
  password varchar(100),
  name varchar(100) default '',
  city varchar(100) default '',
  state varchar(100) default '',
  zipcode varchar(100) default '',
  phone varchar(100) default '',
  register_date text default '',
  resumeUrl text default '',
  title varchar(100) default '',
  restaurant_exp varchar(100) default '',
  introduction varchar(100) default '',
  relocate varchar(100) default '',
  desired_salary varchar(20) default '',
  posted_amount integer default 0
);

create table if not exists Jobs(
  id serial primary key,
  company_name varchar(100),
  company_type varchar(100),
  title varchar(100),
  salary integer,
  street varchar(100),
  city varchar(100),
  state varchar(100),
  zipcode varchar(100),
  phone varchar(100),
  post_date text,
  experience varchar(100),
  description text,
  chinese_desc text,
  free_housing varchar(100),
  default_phone varchar(100)，
  viewed_amount integer
);


create table if not exists Job_applied(
  id serial primary key,
  job_id integer references Jobs(id) on delete cascade,
  person_name varchar(100) default '',
  person_phone varchar(100),
  person_state varchar(100) default '',
  person_city varchar(100) default '',
  apply_date varchar(100)
);
