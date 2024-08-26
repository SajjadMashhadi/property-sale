export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick ? () => onClick() : undefined}
      className="min-w-[80px] w-full sm:w-fit px-[10px] capitalize h-[40px] text-center rounded-[5px] border-solid border-gray-600 border-[1px] hover:bg-gray-600 hover:text-white dark:border-white text-gray-600 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black "
      type="submit"
    >
      {text}
    </button>
  );
}
