import "dotenv/config";
import prisma from "../lib/prisma.js";

async function main() {
  const result = await prisma.$transaction(
    async (tx) => {
      // 동시에 시딩해도 서로 충돌하지 않도록 잠금
      await tx.$queryRaw`
        SELECT pg_advisory_xact_lock(16416, 6)::text AS locked
      `;

      const created = {
        products: 0,
        articles: 0,
        productComments: 0,
        articleComments: 0,
      };

      // 1. 상품 10개 확인 및 생성
      for (let i = 1; i <= 10; i++) {
        const name = `[시드]상품${i}`;

        let product = await tx.product.findFirst({
          where: { name },
        });

        if (!product) {
          product = await tx.product.create({
            data: {
              name,
              description: `테스트를 위해 등록한 중고상품 ${i}번입니다.`,
              price: i * 10000,
              tags: ["테스트", "중고"],
            },
          });

          created.products++;
        }

        // 2. 각 상품에 댓글 2개 확인 및 생성
        for (let j = 1; j <= 2; j++) {
          const content = `상품 테스트 댓글 ${j}`;

          const existingComment = await tx.comment.findFirst({
            where: {
              productId: product.id,
              content,
            },
          });

          if (!existingComment) {
            await tx.comment.create({
              data: {
                content,
                productId: product.id,
              },
            });

            created.productComments++;
          }
        }
      }

      // 3. 자유게시글 20개 확인 및 생성
      for (let i = 1; i <= 20; i++) {
        const title = `[시드]자유게시글 ${i}`;

        let article = await tx.article.findFirst({
          where: { title },
        });

        if (!article) {
          article = await tx.article.create({
            data: {
              title,
              content: `스프린트 미션 6 테스트용 게시글 ${i}번입니다.`,
            },
          });

          created.articles++;
        }

        // 4. 각 게시글에 댓글 2개 확인 및 생성
        for (let j = 1; j <= 2; j++) {
          const content = `게시글 테스트 댓글 ${j}`;

          const existingComment = await tx.comment.findFirst({
            where: {
              articleId: article.id,
              content,
            },
          });

          if (!existingComment) {
            await tx.comment.create({
              data: {
                content,
                articleId: article.id,
              },
            });

            created.articleComments++;
          }
        }
      }

      return created;
    },
    {
      maxWait: 10000,
      timeout: 60000,
    }
  );

  console.log("시딩 확인 완료!");
  console.log(`새 상품: ${result.products}개`);
  console.log(`새 게시글: ${result.articles}개`);
  console.log(`새 상품 댓글: ${result.productComments}개`);
  console.log(`새 게시글 댓글: ${result.articleComments}개`);
}

try {
  await main();
} catch (error) {
  console.error("시딩 오류:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}