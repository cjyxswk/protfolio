import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
function Character({char,index,total,progress}:{char:string;index:number;total:number;progress:any}){const opacity=useTransform(progress,[index/total,Math.min(1,(index+9)/total)],[.2,1]);return <motion.span style={{opacity}}>{char}</motion.span>}
export function AnimatedText({text}:{text:string}){const ref=useRef<HTMLParagraphElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start 0.8','end 0.2']});return <p className="about-text" ref={ref}>{[...text].map((char,index)=><Character key={index} char={char} index={index} total={text.length} progress={scrollYProgress}/>)}</p>}
