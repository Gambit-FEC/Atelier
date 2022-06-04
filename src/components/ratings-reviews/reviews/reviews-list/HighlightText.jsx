import React from 'react';

export default function HighlightText({ text, highlight, bold = false }) {
  if (highlight === '' || highlight === null) {
    return (
      <span style={bold ? { fontWeight: 'bold' } : {}}>{text}</span>
    );
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span style={bold ? { fontWeight: 'bold' } : {}}>
      {parts.filter((part) => part).map((part, index) => {
        if (part.toLowerCase() === highlight.toLowerCase()) {
          return <mark key={index}>{part}</mark>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
