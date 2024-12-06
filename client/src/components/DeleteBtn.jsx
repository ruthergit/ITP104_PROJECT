
const DeleteBtn = ({onClick}) => {
  return (
    <button onClick={onClick} className="flex items-center bg-Red px-4 py-3 mt-3 ml-2 rounded-xl focus:outline-none">
        <img className="mr-2 bg-Red" src="/images/IM-Icons/DeleteIcon.png" alt="Emp" />
        <p className="bg-Red text-xl font-semibold text-Blue">Delete</p>
    </button>
  )
}

export default DeleteBtn
