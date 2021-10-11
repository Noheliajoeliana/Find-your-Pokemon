import React from "react";
import clases from './Page.module.css'


export default function Page({cantPokes, clickPage, page}){
    let numPages = 1 + Math.ceil((cantPokes-9)/12)


    function click(e){
        clickPage(e)
    }

    let pages = []
    for(let i=1; i<=numPages;i++){
        pages.push(<span className={`${page === i && clases.active} ${clases.numpage}`} 
                         onClick={click}     
                         key={i} id={i}> {i} 
                   </span>)
    }
    
    return (
        <div className={clases.pages}>
            {pages}
        </div>
    )
}
