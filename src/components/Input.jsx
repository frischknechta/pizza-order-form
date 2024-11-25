function Input({ type, id, text, value, onChange, ...delegated }) {
  return (
    <>
      <div className="flex flex-col justify-between gap-2">
        <label htmlFor={id} className="flex-1">
          {text}
        </label>
        <input
          type={type}
          name={text}
          id={id}
          placeholder={text}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          className="flex-1 rounded-md border-2 border-black p-1"
          {...delegated}
        />
      </div>
    </>
  );
}

export default Input;
