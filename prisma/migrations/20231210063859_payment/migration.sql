-- AlterTable
CREATE SEQUENCE member_id_seq;
ALTER TABLE "Member" ALTER COLUMN "id" SET DEFAULT nextval('member_id_seq');
ALTER SEQUENCE member_id_seq OWNED BY "Member"."id";
