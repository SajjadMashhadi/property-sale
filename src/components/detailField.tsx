export default function DetailFiels({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) {
  return (
    <div className="w-full flex flex-row justify-between p-[20px]">
      <div className="w-1/3">{title}: </div>
      <div className="w-2/3">{content}</div>
    </div>
  );
}
