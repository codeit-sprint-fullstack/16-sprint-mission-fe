import { useProductForm } from '../hooks/useProductForm';
import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
  const {
    tags,
    tag,
    nameError,
    descriptionError,
    priceError,
    tagError,
    isDisabled,
    isLoading,
    isTagValid,
    isFormValid,
    validateField,
    validateTag,
    addTag,
    removeTag,
    submitForm
  } = useProductForm();
  return (
    <>
      <main className={styles.main}>
        <form className={styles.form} onChange={validateField} onSubmit={submitForm}>
          <div className={styles.formHeader}>
            <h2>상품 등록하기</h2>
            <button type='submit' disabled={isDisabled}>등록</button>
          </div>
          <div className={
            isFormValid.name
            ? styles.field
            : styles.field + ' ' + styles.error
          }>
            <label htmlFor='name'>상품명</label>
            <input id='name' type='text' placeholder='상품명을 입력해주세요' required />
            <p>{nameError}</p>
          </div>
          <div className={
            isFormValid.description
            ? styles.field
            : styles.field + ' ' + styles.error
          }>
            <label htmlFor='description'>상품 소개</label>
            <textarea id='description' placeholder='상품 소개를 입력해주세요' required></textarea>
            <p>{descriptionError}</p>
          </div>
          <div className={
            isFormValid.price
            ? styles.field
            : styles.field + ' ' + styles.error
          }>
            <label htmlFor='price'>판매가격</label>
            <input id='price' type='text' placeholder='판매 가격을 입력해주세요' required />
            <p>{priceError}</p>
          </div>
        </form>
        <form className={styles.form} onSubmit={addTag}>
          <div className={
            isTagValid
            ? styles.field
            : styles.field + ' ' + styles.error
          }>
            <label htmlFor='tags'>태그</label>
            <input id='tags' type='text' placeholder='태그를 입력해주세요' onChange={validateTag} value={tag} />
            <p>{tagError}</p>
            {
              tags.length !== 0 &&
                <ul className={styles.tagList}>
                  {
                    tags.map((t, i) =>
                      <li key={i} onClick={() => removeTag(i)}>#{t}</li>
                    )
                  }
                </ul>
            }
          </div>
        </form>
      </main>
      {
        isLoading &&
        <div className={styles.overlay}></div>
      }
    </>
  );
};

export default RegistrationPage;