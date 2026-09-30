import { useMemo } from "react";

function useProductFormValidation({
  name,
  description,
  price,
  tag,
  tags,
}) {
  const errors = useMemo(() => {
    const validationErrors = {};

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedTag = tag.trim();

    if (!trimmedName) {
      validationErrors.name = "상품명을 입력해주세요.";
    } else if (trimmedName.length > 10) {
      validationErrors.name =
        "상품명은 10자 이내로 입력해주세요.";
    }

    if (!trimmedDescription) {
      validationErrors.description =
        "상품 소개를 입력해주세요.";
    } else if (trimmedDescription.length < 10) {
      validationErrors.description =
        "상품 소개는 10자 이상 입력해주세요.";
    } else if (trimmedDescription.length > 100) {
      validationErrors.description =
        "상품 소개는 100자 이내로 입력해주세요.";
    }

    if (!price) {
      validationErrors.price =
        "판매 가격을 입력해주세요.";
    } else if (!/^\d+$/.test(price)) {
      validationErrors.price =
        "판매 가격은 숫자로 입력해주세요.";
    }

    if (trimmedTag.length > 5) {
      validationErrors.tag =
        "태그는 5자 이내로 입력해주세요.";
    } else if (tags.some((savedTag) => savedTag.length > 5)) {
      validationErrors.tag =
        "태그는 5자 이내로 입력해주세요.";
    } else if (tags.length === 0) {
      validationErrors.tag =
        "태그를 하나 이상 등록해주세요.";
    }

    return validationErrors;
  }, [name, description, price, tag, tags]);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
  };
}

export default useProductFormValidation;