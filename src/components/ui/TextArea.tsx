interface TextAreaProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

/** Многострочное поле из фрейма 06: минимум 82px, текст 14/500. */
export function TextArea({ value, placeholder, onChange }: TextAreaProps) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={3}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      className="min-h-textarea resize-none rounded-btn border border-line bg-surface p-card text-control leading-relaxed font-medium text-text outline-none placeholder:text-muted focus:border-accent"
    />
  );
}
