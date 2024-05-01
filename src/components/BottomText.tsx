function BottomText({
  onClick,
  label,
  to,
}: {
  onClick: () => void;
  label: string;
  to: string;
}) {
  return (
    <>
      <h1 className="text-sm">
        {label} <b className="cursor-pointer" onClick={onClick}>{to}</b>
      </h1>
    </>
  );
}

export default BottomText;
