export default function Input({
  type,
  value,
  label,
  handleChange,
}: {
  type: string;
  value: string | number | undefined;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full flex flex-row justify-between items-center ">
      <label htmlFor={label}>{label}: </label>
      <input
        onChange={(e) => handleChange(e)}
        value={value}
        className="w-[300px] h-[30px] placeholder:text-gray-400 dark:placeholder:text-gray-600 bg-inherit border-b-[#a3a3a341] focus:border-b-gray-400 border-b border-solid focus:outline-none "
        type={type}
        name={label}
        placeholder={label}
      />
    </div>
  );
}
