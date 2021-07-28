import React from 'react'

const success = (header, content) => (
    <div className="flex container rounded-md mx-auto w-auto bg-green-100 bg-opacity-25">
        <div className="max-h-full w-1.5 bg-green-500"></div>
        <div className="flex p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-2 text-green-500 w-auto h-5 w-5 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="flex flex-col">
                <div className="flex-1">
                    <h3 className="antialiased text-green-800 font-medium">{header}</h3>
                    <p className="antialiased text-green-800 font-normal mt-1">{content}</p>
                </div>
            </div>
        </div>
    </div>
)

const error = (header) => ( 
    <div className="flex container bg-red-100 bg-opacity-25 mb-4">
        <div className="max-h-full w-1.5 bg-red-500"></div>
        <div className="p-3">
            <h3 className="antialiased text-red-800">{header}</h3>
        </div>
    </div>
)

const warn = (header, content) => (
    <div className="flex container rounded-md mx-auto w-auto bg-yellow-100 bg-opacity-25">
        <div className="max-h-full w-1.5 bg-yellow-500"></div>
        <div className="flex p-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-2 text-yellow-500 w-auto h-5 w-5 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
                <h3 className="antialiased text-yellow-800 font-medium">{header}</h3>
                <p className="antialiased text-yellow-800 font-normal">{content}</p>
            </div>
        </div>
    </div>
)

const info = (content) => (
    <div className="flex container rounded-md mx-auto w-auto bg-blue-100 bg-opacity-25">
        <div className="max-h-full w-1.5 bg-blue-500"></div>
        <div className="flex p-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-2 text-blue-500 w-auto h-5 w-5 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
                <p className="antialiased text-blue-800 font-normal">{content}</p>
            </div>        
        </div>
    </div>
)


export default function Alert(props) {
    return (
        <div>
            {
                props.success ? success(props.header, props.content) : null ||
                props.error ? error(props.header) : null ||
                props.warn ? warn(props.header, props.content) : null ||
                props.info ? info(props.content) : null
            }
        </div>
    )
}