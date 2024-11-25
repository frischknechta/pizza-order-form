function Slider({ type, id, text, value, onChange, ...delegated }) {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={id}>{`${text}: ${value} cm`}</label>
        <input
          list="values"
          type={type}
          name={text}
          id={id}
          placeholder={text}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          {...delegated}
        />

        <datalist id="values" className="flex justify-between">
          <option value={delegated.min} label={`${delegated.min} cm`}></option>
          <option value={delegated.max} label={`${delegated.max} cm`}></option>
        </datalist>
      </div>
    </>
  );
}

export default Slider;
