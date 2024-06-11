// src/components/FormulaInput.js
import React, { useState, useRef } from 'react';
import useFormulaStore from '../store/useFormulaStore';
import { useSuggestions } from '../api/queries';

const FormulaInput = () => {
  const { tags, addTag, removeTag } = useFormulaStore();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { data: suggestions, isLoading, isError } = useSuggestions(inputValue);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTagClick = (tag) => {
    if (!tags.includes(tag)) {
      addTag(tag);
    }
    setInputValue('');
  };

  const handleTagRemove = (index) => {
    removeTag(index);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e) => {
    // Check if the blur event is happening because of a click inside the suggestion box
    if (
      e.relatedTarget &&
      e.relatedTarget.className.includes('suggestion-item')
    ) {
      return;
    }
    setIsFocused(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex flex-wrap items-center border border-gray-300 rounded-md p-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
            >
              <span>{tag.name}</span>
              <button
                onClick={() => handleTagRemove(index)}
                className="ml-2 text-red-500"
              >
                &times;
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Enter your formula..."
            className="flex-grow p-1 border-none outline-none"
          />
        </div>
      </div>
      {isFocused && (
        <div className="border border-gray-300 max-h-[300px] overflow-auto rounded-md shadow-md p-2">
          {isLoading ? (
            <div className="text-center p-2">Loading...</div>
          ) : isError ? (
            <div className="text-center p-2">Error fetching suggestions</div>
          ) : suggestions && suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion}
                onClick={() => handleTagClick(suggestion)}
                tabIndex={-1}
                className="cursor-pointer p-2 hover:bg-gray-200 suggestion-item"
              >
                {suggestion.name}
              </div>
            ))
          ) : (
            <div className="text-center p-2">Not Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormulaInput;
