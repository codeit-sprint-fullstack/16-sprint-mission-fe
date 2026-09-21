import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { productApi } from '../services/api'; 

export const useProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [tagError, setTagError] = useState('');
  
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isTagValid, setIsTagValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState({
    name: true,
    description: true,
    price: true,
    tags: false
  });
  
  const navigate = useNavigate();
  
  const validateField = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case 'name':
        setName(value);
        if (value.trim().length < 1) {
          setIsFormValid({...isFormValid, [id]: false});
          setNameError('1글자 이상 입력해주세요');
          return;
        } else if (value.length > 10) {
          setIsFormValid({...isFormValid, [id]: false});
          setNameError('10글자 미만으로 입력해주세요');
          return;
        }
        break;
      case 'description':
        setDescription(value);
        if (value.trim().length < 10) {
          setIsFormValid({...isFormValid, [id]: false});
          setDescriptionError('10글자 이상 입력해주세요');
          return;
        } else if (value.length > 100) {
          setIsFormValid({...isFormValid, [id]: false});
          setDescriptionError('100자 미만으로 입력해주세요');
          return;
        }
        break;
      case 'price':
        setPrice(Number(value));
        if (isNaN(Number(value)) || value === '') {
          setIsFormValid({...isFormValid, [id]: false});
          setPriceError('숫자로 입력해주세요');
          return;
        } else if (Number(value) < 0 || Number(value) % 1 !== 0) {
          setIsFormValid({...isFormValid, [id]: false});
          setPriceError('0과 자연수만 입력해주세요');
          return;
        } 
        break;
      }
      
    setIsFormValid({
      ...isFormValid,
      [id]: true
    });
  };

  const validateTag = (e) => {
    setTag(e.target.value);
    if (e.target.value.length > 5) {
      setIsTagValid(false);
      setTagError('5글자 이내로 입력해주세요');
      return;
    } else if (tags.length === 0) {
      setIsTagValid(false);
      setTagError('태그는 1개 이상 입력해주세요');
      return;
    }
    setIsTagValid(true);
  }

  const addTag = (e) => {
    e.preventDefault();

    if (tag.trim() === '' || tag.length > 5) return;
    
    setTags([...tags, tag]);
    setTag('');
    setIsFormValid({
      ...isFormValid,
      tags: true
    });
    setIsTagValid(true);
  };

  const removeTag = (targetIndex) => {
    setTags(tags.filter((t, i) => i !== targetIndex));

    if (tags.length <= 1){
      setIsFormValid({
        ...isFormValid,
        tags: false
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      const envelop = await productApi.create({
        name: name,
        description: description,
        price: price,
        tags: tags
      });
      const id = envelop.data._id;

      navigate(`/items/${id}`);
    } catch (err) {
      alert('상품 등록에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    setIsDisabled(
      !Object.values(isFormValid)
        .every(val => val === true)
    );
  }, [isFormValid]);

  return {
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
  }
}