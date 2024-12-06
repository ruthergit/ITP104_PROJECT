const ViewTaskBtn = ({onClick}) => {
  return (
    <button onClick={onClick} className="flex items-center bg-Green px-4 py-3 mt-3 ml-2 rounded-xl focus:outline-none">
        <img className="w-5 mr-2 pt-[2px] bg-Green" src="/images/IM-Icons/ViewTaskIcon.png" alt="Emp" />
        <p className="bg-Green text-xl font-semibold text-Blue">View Task</p>
    </button>
  )
}

export default ViewTaskBtn
