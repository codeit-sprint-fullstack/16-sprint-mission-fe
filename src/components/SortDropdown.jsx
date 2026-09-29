import { useEffect, useRef, useState } from "react";

const OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const optionRefs = useRef([]);
  const selectedOption = OPTIONS.find((option) => option.value === value) ?? OPTIONS[0];

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen) optionRefs.current[OPTIONS.findIndex((option) => option.value === value)]?.focus();
  }, [isOpen, value]);

  const selectOption = (nextValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  const handleOptionKeyDown = (event, index) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      rootRef.current?.querySelector(".sort-dropdown-trigger")?.focus();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      optionRefs.current[(index + direction + OPTIONS.length) % OPTIONS.length]?.focus();
    }
  };

  return (
    <div className="sort-dropdown" ref={rootRef}>
      <button
        type="button"
        className="sort-dropdown-trigger"
        aria-label={`상품 정렬: ${selectedOption.label}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="sort-dropdown-label">{selectedOption.label}</span>
        <svg className="sort-dropdown-chevron" aria-hidden="true" viewBox="0 0 24 24">
          <path d="m7 10 5 5 5-5" />
        </svg>
        <svg className="sort-dropdown-mobile-icon" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 7h10M4 12h7M4 17h4M17 5v14m0 0-3-3m3 3 3-3" />
        </svg>
      </button>

      {isOpen && (
        <div className="sort-dropdown-menu" role="listbox" aria-label="상품 정렬 방식">
          {OPTIONS.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => { optionRefs.current[index] = element; }}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className="sort-dropdown-option"
              onClick={() => selectOption(option.value)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
