export default function useProductValidation({
  name,
  description,
  price,
  tagInput,
  tags,
}) {
  const errors = {};

  const trimmedName = name.trim();
  const trimmedDescription = description.trim();
  const trimmedTag = tagInput.trim();

  if (trimmedName.length < 1 || trimmedName.length > 10) {
    errors.name = "상품명은 1~10자로 입력해주세요.";
  }

  if (
    trimmedDescription.length < 10 ||
    trimmedDescription.length > 100
  ) {
    errors.description = "상품 소개는 10~100자로 입력해주세요.";
  }

  if (
    price === "" ||
    !Number.isFinite(Number(price)) ||
    Number(price) < 0
  ) {
    errors.price = "올바른 판매 가격을 입력해주세요.";
  }

  if (trimmedTag.length > 5 || tags.some((tag) => tag.length > 5)) {
    errors.tags = "태그는 5자 이하로 입력해주세요.";
  }

  const isValid =
    !errors.name &&
    !errors.description &&
    !errors.price &&
    !errors.tags;

  return {
    errors,
    isValid,
  };
}