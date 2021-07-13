import React, {useState, Fragment} from 'react'

export default function RoutingInfo({route}) {
    const [routing, setRouting] = useState(route)

    return (
        <div className="flex flex-wrap mb-5 px-4 py-2 items-center bg-gray-50 border rounded-md">
            {
                routing.map((route,index) =>(
                   <Fragment>
                       {
                            routing.length-1 === index ?
                            null
                            :
                            <Fragment>
                                <p className="font-light text-sm">{route}</p> 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Fragment>  
                       }
                    </Fragment>
                ))
            }                        
            <p className="font-medium text-sm primary">{routing[routing.length-1]}</p>
        </div>
    )
}
