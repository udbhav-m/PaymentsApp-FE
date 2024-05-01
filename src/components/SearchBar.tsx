function SearchBar({
  onChange,
  label,
}: {
  onChange: (e: any) => void;
  label: string;
}) {
  return (
    <div>
      <div className="space-y-4">
        <h1 className="font-semibold pl-2">{label}</h1>
        <input
          onChange={onChange}
          className="w-full border py-2 rounded-md px-3 focus:outline-none bg-slate-50 focus:bg-white shadow-md"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default SearchBar;
