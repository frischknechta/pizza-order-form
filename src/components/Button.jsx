function Button({ text, status }) {
  return (
    <button
      className={`w-fit self-center rounded-lg bg-black px-4 py-2 font-semibold text-white transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100`}
      disabled={status === "loading" ? true : false}
    >
      {text}
    </button>
  );
}

export default Button;
