// ======================================================================
// 1. Custom Hook 만들기
// ======================================================================
//
// src/hooks/useProductFormValidation.js
// ======================================================================

function useProductFormValidation({ name, description, price, tagText, tags }) {
  // ====================================================================
  // 상품명 검사
  // ====================================================================
  //
  // 빈 값
  // → "상품명을 입력해주세요."
  //
  // 10자 초과
  // → "10자 이내로 입력해주세요."

  let nameError = "";

  if (name.length === 0) {
    nameError = "상품명을 입력해주세요.";
  } else if (name.length > 10) {
    nameError = "10자 이내로 입력해주세요.";
  }

  // ====================================================================
  // 상품 소개 검사
  // ====================================================================

  let descriptionError = "";

  if (description.length === 0) {
    descriptionError = "상품 소개를 입력해주세요.";
  } else if (description.length < 10) {
    descriptionError = "10자 이상 입력해주세요.";
  } else if (description.length > 100) {
    descriptionError = "100자 이내로 입력해주세요.";
  }

  // ====================================================================
  // 가격 검사
  // ====================================================================

  let priceError = "";

  if (price.length === 0) {
    priceError = "판매 가격을 입력해주세요.";
  } else if (!/^\d+$/.test(price)) {
    priceError = "숫자로 입력해주세요.";
  }

  // ====================================================================
  // 태그 검사
  // ====================================================================

  let tagError = "";

  // ⭐ 등록된 태그가 하나도 없으면 에러
  if (tags.length === 0) {
    tagError = "태그를 입력해주세요.";
  }

  // ⭐ 지금 입력하고 있는 태그가 5글자를 넘으면 에러
  if (tagText.length > 5) {
    tagError = "5글자 이내로 입력해주세요.";
  }

  // ====================================================================
  // 전체 폼이 정상인지 확인
  // ====================================================================

  const isNameValid = name.length >= 1 && name.length <= 10;

  const isDescriptionValid =
    description.length >= 10 && description.length <= 100;

  const isPriceValid = price.length >= 1 && /^\d+$/.test(price);

  // 태그는 최소 하나가 등록되어 있고
  // 모든 태그가 5글자 이하여야 함.
  const isTagsValid = tags.length > 0 && tags.every((tag) => tag.length <= 5);

  // ====================================================================
  // 등록 버튼 활성화 여부
  // ====================================================================
  //
  // 네 가지를 모두 통과해야 true

  const isFormValid =
    isNameValid && isDescriptionValid && isPriceValid && isTagsValid;

  // ====================================================================
  // RegistrationPage로 돌려주기
  // ====================================================================

  return {
    nameError,
    descriptionError,
    priceError,
    tagError,
    isFormValid,
  };
}

export default useProductFormValidation;
