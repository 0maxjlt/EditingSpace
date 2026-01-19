-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCreator" BOOLEAN NOT NULL DEFAULT false,
    "isEditor" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "publisherId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoProject" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price_min" DOUBLE PRECISION NOT NULL,
    "price_max" DOUBLE PRECISION NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VideoProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsVideoProject" (
    "id" SERIAL NOT NULL,
    "VideoProjectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagsVideoProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsEditorResume" (
    "id" SERIAL NOT NULL,
    "EditorResumeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagsEditorResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bonusCategoryVideoProject" (
    "id" SERIAL NOT NULL,
    "videoProjectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "bonusCategoryVideoProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bonusCategoryEditorResume" (
    "id" SERIAL NOT NULL,
    "editorResumeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "bonusCategoryEditorResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditorResume" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EditorResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tools" (
    "id" SERIAL NOT NULL,
    "editorResumeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteVideoProject" (
    "userId" INTEGER NOT NULL,
    "videoProjectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteVideoProject_pkey" PRIMARY KEY ("userId","videoProjectId")
);

-- CreateTable
CREATE TABLE "FavoriteEditorResume" (
    "userId" INTEGER NOT NULL,
    "editorResumeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteEditorResume_pkey" PRIMARY KEY ("userId","editorResumeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Review_profileId_idx" ON "Review"("profileId");

-- CreateIndex
CREATE INDEX "Review_publisherId_idx" ON "Review"("publisherId");

-- CreateIndex
CREATE INDEX "VideoProject_userId_idx" ON "VideoProject"("userId");

-- CreateIndex
CREATE INDEX "VideoProject_status_price_min_idx" ON "VideoProject"("status", "price_min");

-- CreateIndex
CREATE INDEX "VideoProject_status_updatedAt_idx" ON "VideoProject"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "TagsVideoProject_VideoProjectId_idx" ON "TagsVideoProject"("VideoProjectId");

-- CreateIndex
CREATE UNIQUE INDEX "TagsVideoProject_VideoProjectId_name_key" ON "TagsVideoProject"("VideoProjectId", "name");

-- CreateIndex
CREATE INDEX "TagsEditorResume_EditorResumeId_idx" ON "TagsEditorResume"("EditorResumeId");

-- CreateIndex
CREATE UNIQUE INDEX "TagsEditorResume_EditorResumeId_name_key" ON "TagsEditorResume"("EditorResumeId", "name");

-- CreateIndex
CREATE INDEX "bonusCategoryVideoProject_videoProjectId_idx" ON "bonusCategoryVideoProject"("videoProjectId");

-- CreateIndex
CREATE INDEX "bonusCategoryEditorResume_editorResumeId_idx" ON "bonusCategoryEditorResume"("editorResumeId");

-- CreateIndex
CREATE INDEX "EditorResume_userId_idx" ON "EditorResume"("userId");

-- CreateIndex
CREATE INDEX "EditorResume_status_updatedAt_idx" ON "EditorResume"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "Tools_editorResumeId_idx" ON "Tools"("editorResumeId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProject" ADD CONSTRAINT "VideoProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsVideoProject" ADD CONSTRAINT "TagsVideoProject_VideoProjectId_fkey" FOREIGN KEY ("VideoProjectId") REFERENCES "VideoProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsEditorResume" ADD CONSTRAINT "TagsEditorResume_EditorResumeId_fkey" FOREIGN KEY ("EditorResumeId") REFERENCES "EditorResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonusCategoryVideoProject" ADD CONSTRAINT "bonusCategoryVideoProject_videoProjectId_fkey" FOREIGN KEY ("videoProjectId") REFERENCES "VideoProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonusCategoryEditorResume" ADD CONSTRAINT "bonusCategoryEditorResume_editorResumeId_fkey" FOREIGN KEY ("editorResumeId") REFERENCES "EditorResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditorResume" ADD CONSTRAINT "EditorResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_editorResumeId_fkey" FOREIGN KEY ("editorResumeId") REFERENCES "EditorResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteVideoProject" ADD CONSTRAINT "FavoriteVideoProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteVideoProject" ADD CONSTRAINT "FavoriteVideoProject_videoProjectId_fkey" FOREIGN KEY ("videoProjectId") REFERENCES "VideoProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteEditorResume" ADD CONSTRAINT "FavoriteEditorResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteEditorResume" ADD CONSTRAINT "FavoriteEditorResume_editorResumeId_fkey" FOREIGN KEY ("editorResumeId") REFERENCES "EditorResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
