import React from "react"
import {Link} from 'react-router-dom'

export default function Notfound(){
    return(
         <div className="container p-5 mb-5">
            <div className="row text-center">
                <h1 className="mt-5">404 (×_×) Page Not Found!</h1>
                <p>
                    We couldn’t find the page you were looking for. 
                </p>
                
            </div>
        </div>
    )
}