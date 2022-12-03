function PaginateButton({navigate, canNavigate, label}
    : { navigate: () => void; canNavigate: () => boolean; label: string;}) {
  return (
    <button onClick={() => navigate()} 
            disabled={!canNavigate()} 
            className="ml-3 py-px px-4 hover:bg-sky-200 disabled:opacity-75">
        {label}
    </button>
  );
};

export default PaginateButton;
