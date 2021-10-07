import React from "react";


export default function Page({cantPokes, clickPage}){
    let numPages = 1 + Math.ceil((cantPokes-9)/12)

    let pages = []
    for(let i=1; i<=numPages;i++){
        pages.push(<span onClick={(e)=>clickPage(e)} key={i} id={i}> {i} </span>)
    }
    
    return (
        <div>
            {pages}
        </div>
    )
}
