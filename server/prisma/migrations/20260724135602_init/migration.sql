-- CreateTable
CREATE TABLE "Court" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "indoor" BOOLEAN NOT NULL,

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);
