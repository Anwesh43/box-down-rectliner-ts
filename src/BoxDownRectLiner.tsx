import React from 'react'
import withContext from './withContext'
import {useStyle} from './hooks'
interface BoxDownRectLinerProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function 
}
const BoxDownRectLiner = (props : BoxDownRectLinerProps) => {
    const {
        boxStyle, 
        lineStyle, 
        smallSquareStyle 
    } = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div style = {boxStyle()}></div>
            <div style = {lineStyle()}></div>
            <div style = {smallSquareStyle()}></div>
        </React.Fragment>
    )
}

export default withContext(BoxDownRectLiner)