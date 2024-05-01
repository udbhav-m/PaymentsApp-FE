function Button({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <div>
      <button
        className="bg-gray-900 text-white w-full h-10 rounded-lg hover:bg-gray-950"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
