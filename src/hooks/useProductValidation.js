function useProductValidation({
  name,
  description,
  price,
  tagInput,
  tags,
}) {
  const errors = {};

  // 상품명
  if (!name.trim()) {
    errors.name = "상품명을 입력해주세요.";
  } else if (name.trim().length > 10) {
    errors.name = "상품명은 10자 이내로 입력해주세요.";
  }

  // 상품 소개
  if (!description.trim()) {
    errors.description = "상품 소개를 입력해주세요.";
  } else if (description.trim().length < 10) {
    errors.description = "상품 소개는 10자 이상 입력해주세요.";
  } else if (description.trim().length > 100) {
    errors.description = "상품 소개는 100자 이내로 입력해주세요.";
  }

  // 판매 가격
  if (!price) {
    errors.price = "판매 가격을 입력해주세요.";
  } else if (!/^\d+$/.test(price)) {
    errors.price = "판매 가격은 숫자로 입력해주세요.";
  }

  // 현재 입력 중인 태그
  if (tagInput.trim().length > 5) {
    errors.tag = "태그는 5글자 이내로 입력해주세요.";
  }

  // 이미 등록된 태그 중 잘못된 값 확인
  if (tags.some((tag) => tag.length > 5)) {
    errors.tag = "태그는 5글자 이내로 입력해주세요.";
  }

  const isValid =
    Object.keys(errors).length === 0 &&
    tags.length > 0;

  return {
    errors,
    isValid,
  };
}

export default useProductValidation;