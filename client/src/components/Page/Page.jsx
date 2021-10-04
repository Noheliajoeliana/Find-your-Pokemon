import React from "react";


export default function Page({cantPokes, clickPage}){
    let numPages = Math.ceil(cantPokes/9)

    
    let pages = []
    for(let i=1; i<=numPages;i++){
        pages.push(<span onClick={(e)=>clickPage(e)} id={i}> {i} </span>)
    }
    return (
        <div>
            {pages}
        </div>
    )
}
