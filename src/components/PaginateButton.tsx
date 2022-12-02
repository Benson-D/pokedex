function PaginateButton({navigate, canNavigate, label}
    : { navigate: () => void; canNavigate: () => boolean; label: string;}) {
  return (
    <div>
        <button onClick={() => navigate()} disabled={!canNavigate()}>
            {label}
        </button>
    </div>
  );
};

export default PaginateButton;
