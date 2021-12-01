import {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.01 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev + scGap > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {

        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const size : number = Math.min(w, h) / 10 
    const smallSquareSize : number = Math.min(w, h) / 20 
    const background = 'indigo'
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 2)
    const sf2 : number = divideScale(sf, 1, 2)
    return {
        boxStyle() : CSSProperties {
            const left = `${w / 2- size / 2}px`
            const top = `${h / 2 - size / 2}px`
            const width = `${size}px`
            const height = `${size}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                background 
            }
        },
        lineStyle() : CSSProperties {
            const lineWidth : number = Math.min(w, h) / 90
            const left = `${w / 2 - lineWidth / 2}px`
            const top = `${h / 2 - size / 2 - size * sf1}px`
            const width = `${lineWidth}px`
            const height = `${size * sf1}px`
            return {
                left, 
                top, 
                position, 
                width, 
                height, 
                background 
            }
        },
        smallSquareStyle() : CSSProperties {
            const width = `${smallSquareSize}px`
            const height = `${smallSquareSize}px`
            const top = `${-smallSquareSize + (h / 2 - size / 2 + smallSquareSize) * sf2}px`
            const left = `${w / 2 - smallSquareSize / 2}px`
            return {
                position, 
                width, 
                height, 
                top, 
                left, 
                background
            }
        }
    }
}