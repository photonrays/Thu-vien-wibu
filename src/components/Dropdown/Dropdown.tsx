import Iconify from '../Iconify'
import './Dropdown.scss'

type DropdownType = {
  title?: string,
  data?: any[],
  isOpen: boolean
  state?: any,
  setState?: React.Dispatch<React.SetStateAction<any>>
}

export default function Dropdown({ title, data, isOpen, state, setState }: DropdownType) {
  return (
    <div className='w-full h-full bg-gray-200 grow rounded-md relative transition-all flex items-center justify-between'>
      <div>
        <span className='block text-sm ml-3'>{title}</span>
        <span className='block ml-3'>{state}</span>
      </div>
      <Iconify icon='ep:arrow-down-bold' className={`mr-3 transform ${ isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200 ease-in-out`} />
      <div className={`absolute top-full w-full rounded-md dropdown z-50 bg-gray-200 p-1 select-none ${isOpen ? 'active' : ''}`}>
        {data?.map((data, index) => <div key={index} className={`w-full text-lg py-1 pl-2 flex items-center hover:bg-primary hover:text-white mb-1 rounded-md ${state == data ? 'bg-primary text-white' : ''}`} onClick={() => setState(data)}>{data}</div>)}
      </div>
    </div>

  )
}
