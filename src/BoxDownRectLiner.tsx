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
            <div style = {boxStyle()} onClick = {() => props.onClick()}></div>
            <div style = {lineStyle()}></div>
            {[0, 1].map((i : number) => (<div key = {`box_down_liner_${i}`} style = {smallSquareStyle(i)}></div>))}
        </React.Fragment>
    )
}

export default withContext(BoxDownRectLiner)