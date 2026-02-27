import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../features/searchSlice' 

const Tabs = () => {
    const tabs = ["Photos", "Videos", "gifs"]
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.search.activeTab)

    return (
        <div className="flex justify-center gap-3 mt-24">
            {tabs.map((elem, idx) => (
                <button
                    key={idx}
                    onClick={()=>{
                        dispatch(setActiveTab(elem))
                    }}
                     className={`
    px-4 py-2 rounded-md text-sm uppercase
    ${activeTab === elem 
      ? "bg-gray-600 text-white" 
      : "bg-gray-800 text-gray-400 hover:bg-gray-700"}
  `}
                >
                    {elem}
                </button>
            ))}
        </div>
    )
}

export default Tabs
