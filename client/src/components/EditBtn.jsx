

const EditBtn = ({ onClick}) => {
  return (
    <button onClick={onClick} className="flex items-center bg-Orange px-4 py-3 mt-3 ml-4 rounded-xl focus:outline-none">
        <img className="mr-2 bg-Orange" src="/images/IM-Icons/EditIcon.png" alt="Emp" />
        <p className="bg-Orange text-xl font-semibold text-Blue">Edit</p>
    </button>
  )
}

export default EditBtn
