const AddButton = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-Orange px-5 py-3 rounded-xl focus:outline-none"
    >
      <img
        className="mr-2 bg-Orange"
        src="/images/IM-Icons/PlusIcon.png"
        alt="Emp"
      />
      <p className="bg-Orange text-xl font-semibold text-Blue">{title}</p>
    </button>
  );
};

export default AddButton;
