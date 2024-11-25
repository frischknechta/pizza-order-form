function CheckboxesInput({ options, name, value, setter }) {
  function handleChange(event) {
    const ingredient = event.target.value;
    if (!value.includes(ingredient)) {
      setter([...value, ingredient]);
    } else {
      let newValue = value.filter((elem) => elem !== ingredient);
      setter(newValue);
    }
  }

  return (
    <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2">
      {options.map(({ type, price }, index) => {
        return (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              id={`${name}${type}`}
              value={type}
              onChange={handleChange}
              checked={value.includes(type)}
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

export default CheckboxesInput;
