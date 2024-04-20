import { useEffect, useState, useRef, MutableRefObject } from "react";

export function useResizeObserver(ref: MutableRefObject<HTMLDivElement | null>) {
    const [element, setElement] = useState<Element | null>(null);
    const [rect, setRect] = useState<DOMRect | {}>({});
    const observer = useRef<ResizeObserver | null>(null);
  
    const cleanOb = () => {
        if (observer.current) {
            observer.current.disconnect();
        }
    };
  
    useEffect(() => {
        setElement(ref.current);
    }, [ref]);
  
    useEffect(() => {
        if (!element) { return; }
        cleanOb();
        const ob = (observer.current = new ResizeObserver(([entry]) => {
            setRect(entry.target.getBoundingClientRect());
        }));
        ob.observe(element);
        return () => cleanOb();
    }, [element]);
  
    return rect;
}
