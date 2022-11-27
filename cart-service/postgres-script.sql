create extension if not exists "uuid-ossp";

create table carts(                          
id uuid primary key default uuid_generate_v4(),
created_at DATE NOT NULL,                    
updated_at DATE NOT NULL
);

create table cart_items(                     
cart_id uuid,                                
product_id uuid,                             
count integer,                               
foreign key("cart_id") references "carts" ("id")
on delete cascade
on update cascade
);

insert into carts(created_at, updated_at) values('2022-11-22', '2022-11-22');

insert into cart_items values('1b0f7d68-69e0-48c6-acb4-149f9d4040c6', 'b530b5c0-6554-11ed-b642-f1c870df6c5f', 2);
insert into cart_items values('1b0f7d68-69e0-48c6-acb4-149f9d4040c6', '035778c0-6432-11ed-bd57-0f6194d4c5d8', 1);
insert into cart_items values('75e1ac9a-bd13-4830-9335-5124d6b7daae', '70adfe80-6491-11ed-b111-9383254695dc', 1);
select * from carts;
select * from cart_items;