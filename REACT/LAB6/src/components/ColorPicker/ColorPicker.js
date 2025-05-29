import React, { useState, useEffect } from 'react';
import './styles.css';

const ColorPicker = () => {
  const colorPalette = [
    '#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3',
    '#33FFF3', '#FF8C33', '#8C33FF', '#33FF8C', '#FF338C',
    '#A833FF', '#33FFA8', '#FF33A8', '#33A8FF', '#FF5733'
  ];

  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [savedColors, setSavedColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка сохраненных цветов из localStorage при монтировании
  useEffect(() => {
    const loadSavedColors = () => {
      try {
        const storedColors = localStorage.getItem('savedColors');
        if (storedColors) {
          const parsedColors = JSON.parse(storedColors);
          if (Array.isArray(parsedColors)) {
            setSavedColors(parsedColors);
          }
        }
      } catch (error) {
        console.error('Error loading colors from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedColors();
  }, []);

  // Сохранение цветов в localStorage при изменении
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('savedColors', JSON.stringify(savedColors));
      } catch (error) {
        console.error('Error saving colors to localStorage:', error);
      }
    }
  }, [savedColors, isLoading]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleReset = () => {
    setSelectedColor('#FFFFFF');
  };

  const handleSave = () => {
    if (selectedColor && !savedColors.includes(selectedColor)) {
      setSavedColors([...savedColors, selectedColor]);
    }
  };

  const removeSavedColor = (colorToRemove) => {
    setSavedColors(savedColors.filter(color => color !== colorToRemove));
  };

  if (isLoading) {
    return <div className="color-picker-container">Loading...</div>;
  }

  return (
    <div className="color-picker-container">
      <h2>Color Picker</h2>
      
      <div className="color-display" style={{ backgroundColor: selectedColor }}>
        {selectedColor}
      </div>
      
      <div className="controls">
        <button onClick={handleReset} className="btn reset-btn">Reset</button>
        <button onClick={handleSave} className="btn save-btn">Save</button>
      </div>
      
      <h3>Color Palette</h3>
      <div className="color-palette">
        {colorPalette.map((color, index) => (
          <div
            key={index}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
            title={color}
          />
        ))}
      </div>
      
      <h3>Saved Colors</h3>
      {savedColors.length > 0 ? (
        <div className="saved-colors">
          {savedColors.map((color, index) => (
            <div key={index} className="saved-color-item">
              <div
                className="saved-color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
              <span className="saved-color-value">{color}</span>
              <button
                className="remove-btn"
                onClick={() => removeSavedColor(color)}
                title="Remove color"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved colors yet</p>
      )}
    </div>
  );
};

export default ColorPicker;