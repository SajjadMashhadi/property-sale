export default function Button({ text }: { text: string }) {
  return (
    <button
      className="w-[80px] h-[40px] text-center rounded-[5px] border-solid border-black border-[1px] hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black "
      type="submit"
    >
      {text}
    </button>
  );
}
