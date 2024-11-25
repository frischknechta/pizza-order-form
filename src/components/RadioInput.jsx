function RadioInput({ name, options, value, setter }) {
  return (
    <div className="flex flex-wrap justify-around gap-2">
      {options.map(({ type, price, ...delegated }, index) => {
        return (
          <div key={index} className="flex gap-2">
            <input
              type="radio"
              name={name}
              id={`${name}${type}`}
              value={type}
              checked={value === type}
              onChange={() => setter(type)}
            />
            <label htmlFor={`${name}${type}`}>
              {type} {price > 0 && <span>(+ {price.toFixed(2)} CHF)</span>}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default RadioInput;
