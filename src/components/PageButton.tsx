import { useNavigate } from "react-router-dom";

function PageButton({ label, to }: { label: string; to: string }) {
  const navigate = useNavigate();
  return (
    <div>
      <button className="font-semibold pr-2" onClick={() => navigate(to)}>
        {label}
      </button>
    </div>
  );
}

export default PageButton;
