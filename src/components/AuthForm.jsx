import { useMemo, useState } from 'react'

import visibilityIcon from '../assets/icon/image.png'

function AuthForm({ fields, submitText }) {
  const initialValues = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.label, ''])),
    [fields],
  )
  const [values, setValues] = useState(initialValues)
  const [touchedFields, setTouchedFields] = useState({})
  const [visiblePasswords, setVisiblePasswords] = useState({})
  const isInvalidEmail = (field) =>
    field.type === 'email' && values[field.label] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field.label])
  const isInvalidPassword = (field) =>
    field.type === 'password' && values[field.label] && values[field.label].length < 8
  const isPasswordMismatch = (field) =>
    field.label === '비밀번호 확인' &&
    values[field.label] &&
    values['비밀번호'] &&
    values[field.label] !== values['비밀번호']
  const getFieldError = (field) => {
    if (isInvalidEmail(field)) {
      return '잘못된 이메일 형식입니다.'
    }

    if (isInvalidPassword(field)) {
      return '비밀번호를 8자 이상 입력해주세요.'
    }

    if (isPasswordMismatch(field)) {
      return '비밀번호가 일치하지 않습니다.'
    }

    return ''
  }
  const isActive = fields.every(
    (field) =>
      values[field.label]?.trim() &&
      !isInvalidEmail(field) &&
      !isInvalidPassword(field) &&
      !isPasswordMismatch(field),
  )

  const handleChange = (label, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [label]: value,
    }))
  }

  const togglePassword = (label) => {
    setVisiblePasswords((currentVisiblePasswords) => ({
      ...currentVisiblePasswords,
      [label]: !currentVisiblePasswords[label],
    }))
  }

  const markAsTouched = (label) => {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [label]: true,
    }))
  }

  return (
    <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
      {fields.map((field) => (
        <label className="form-field" key={field.label}>
          <span>{field.label}</span>
          <span className="input-wrap">
            <input
              className={touchedFields[field.label] && getFieldError(field) ? 'input-error' : ''}
              type={
                field.type === 'password' && !visiblePasswords[field.label] ? 'password' : 'text'
              }
              placeholder={field.placeholder}
              value={values[field.label]}
              onChange={(event) => handleChange(field.label, event.target.value)}
              onBlur={() => markAsTouched(field.label)}
            />
            {field.type === 'password' && (
              <button
                className="password-toggle"
                type="button"
                aria-label={`${field.label} ${visiblePasswords[field.label] ? '숨기기' : '보기'}`}
                aria-pressed={Boolean(visiblePasswords[field.label])}
                onClick={() => togglePassword(field.label)}
              >
                <img src={visibilityIcon} alt="" />
              </button>
            )}
          </span>
          {touchedFields[field.label] && getFieldError(field) && (
            <strong className="field-error">{getFieldError(field)}</strong>
          )}
        </label>
      ))}
      <button className="auth-submit" type="submit" disabled={!isActive}>
        {submitText}
      </button>
    </form>
  )
}

export default AuthForm
