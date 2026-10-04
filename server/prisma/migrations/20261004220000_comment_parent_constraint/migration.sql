ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_exactly_one_parent_check"
CHECK (
  ("productId" IS NOT NULL AND "articleId" IS NULL)
  OR
  ("productId" IS NULL AND "articleId" IS NOT NULL)
);