const useProductValidation = ({
  name,
  description,
  price,
  tagInput,
}) => {
  const errors = {
    name: '',
    description: '',
    price: '',
    tag: '',
  };

  if (name.length > 10) {
    errors.name = '10자 이내로 입력해주세요';
  }

  if (
    description.length > 0 &&
    description.length < 10
  ) {
    errors.description =
      '10자 이상 입력해주세요';
  }

  if (description.length > 100) {
    errors.description =
      '100자 이내로 입력해주세요';
  }

  if (price && !/^\d+$/.test(price)) {
    errors.price = '숫자로 입력해주세요';
  }

  if (tagInput.length > 5) {
    errors.tag = '5글자 이내로 입력해주세요';
  }

  return errors;
};

export default useProductValidation;