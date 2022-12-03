function PaginateButton({navigate, canNavigate, label}
    : { navigate: () => void; canNavigate: () => boolean; label: string;}) {
  return (
    <button onClick={() => navigate()} 
            disabled={!canNavigate()} 
            className="ml-3 py-px px-3 rounded hover:bg-sky-200 disabled:opacity-50 disabled:hover:bg-transparent">
        {label}
    </button>
  );
};

export default PaginateButton;
