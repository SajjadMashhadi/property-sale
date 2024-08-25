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
      className="min-w-[80px] w-full sm:w-fit px-[10px] h-[40px] text-center rounded-[5px] border-solid border-black border-[1px] hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black "
      type="submit"
    >
      {text}
    </button>
  );
}
