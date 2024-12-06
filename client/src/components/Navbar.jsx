import {NavLink} from 'react-router-dom';


const navbar = () => {
  return (
    <>
    <div className='bg-Blue h-20 w-full px-64 inline-flex justify-between items-center'>
      <div className='flex content-center text-xl '>
        <div>
          <img src="/images/IM-Icons/FinalProjectIcon.png" alt="FinalProjectIcon" />
          </div>
          <h1 className='text-white ml-1'>Final Project</h1>
      </div>
    <div className='flex content-center gap-14'>
        <NavLink to="/" >
        <div className='flex content-center text-xl '>
            <img className='' src="/images/IM-Icons/EmployeeIcon.png" alt="Emp" />
            <h1 className='text-white ml-1'>Employee</h1>
        </div>
        </NavLink>
        <NavLink to="/Project" >
        <div className='flex content-center text-xl '>
            <img  src="/images/IM-Icons/ProjectIcon.png" alt="pro" />
            <h1 className='text-white ml-2'>Project</h1>
        </div>
        </NavLink>
        <NavLink to="/Department" >
        <div className='flex content-center text-xl '>
            <img  src="/images/IM-Icons/DepartmentIcon.png" alt="Emp" />
            <h1 className='text-white ml-1'>Department</h1>
        </div>
        </NavLink>
      </div>
    </div>
    <hr className='border-t-1 border-BorderBlue'/>
    </>
  )
}

export default navbar
