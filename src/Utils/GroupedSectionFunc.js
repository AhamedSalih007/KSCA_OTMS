export function groupFormByHeader(formData) {
  const grouped = {};
  let currentHeader = 'PLAYER INFO'; // default first card if not provided

  formData.forEach(item => {
    if (item.type === 'header') {
      currentHeader = item.label.trim();
      grouped[currentHeader] = [];
    } else {
      if (!grouped[currentHeader]) grouped[currentHeader] = [];
      grouped[currentHeader].push(item);
    }
  });

  return grouped;
}
