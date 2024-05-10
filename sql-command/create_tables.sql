

CREATE TABLE IF NOT EXISTS public."GoodDeeds"
(
    "Id" serial NOT NULL,
    "GoodDeed" character varying COLLATE pg_catalog."default" NOT NULL,
    "UserId" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_b34960d7c2e322e123e285c9e2e" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS public."Users"
(
    "Name" character varying COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying COLLATE pg_catalog."default" NOT NULL,
    "Id" character varying(15) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_329bb2946729a51bd2b19a5159f" PRIMARY KEY ("Id"),
    CONSTRAINT "UQ_884fdf47515c24dbbf6d89c2d84" UNIQUE ("Email")
);

CREATE TABLE IF NOT EXISTS public."UsersFriends"
(
    "UserId" character varying COLLATE pg_catalog."default" NOT NULL,
    "FriendId" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_6e02a52365dd62706daa8266264" PRIMARY KEY ("UserId", "FriendId")
);

CREATE TABLE IF NOT EXISTS public.migrations
(
    id serial NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."GoodDeeds"
    ADD CONSTRAINT "FK_9829cd7525a765f99ee05eb679d" FOREIGN KEY ("UserId")
    REFERENCES public."Users" ("Id") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."UsersFriends"
    ADD CONSTRAINT "FK_1cb084378c893bb487ff8173f3d" FOREIGN KEY ("FriendId")
    REFERENCES public."Users" ("Id") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."UsersFriends"
    ADD CONSTRAINT "FK_5b261770df5403603980447678d" FOREIGN KEY ("UserId")
    REFERENCES public."Users" ("Id") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;
