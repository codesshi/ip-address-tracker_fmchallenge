import './Snackbar.css';
import { useState } from 'react';

const [MOUNTING, MOUNTED, UNMOUNTING, UNMOUNTED] = ["MOUNTING", "MOUNTED", "UNMOUNTING", "UNMOUNTED"];

const Snackbar = ({bg = "black", show = false, children}) => {
    const background = bg;
    let [state, setState] = useState({
        status: UNMOUNTED,
        animationType: "slide-in"
    });
    
    if (state.status === UNMOUNTED && show) {
        state = { status: MOUNTING, animationType: "slide-in" };
        setState(state);
    }

    if (state.status === MOUNTED && !show) {
        state = { status: UNMOUNTING, animationType: "slide-out" };
        setState(state);
    }

    if (state.status === MOUNTING) show = true;
    if (state.status === UNMOUNTING) show = true;

    const handleAnimationEnd = () => {
        const status = state.status === MOUNTING ? MOUNTED : UNMOUNTED;

        setState({ status, animationType: state.animationType });
    }

    if (!show)
        return null;

    return (
        <div className="snackbar" style={{background, animation: `300ms ${state.animationType} 1 forwards`}} onAnimationEnd={handleAnimationEnd} >
            <div className="container">{children}</div>
        </div>
    )
}

export const FetchingSnackbar = ({show}) => {
    return (
        <Snackbar bg="#1b1b1b" show={show}>Retriving Data...</Snackbar>
    )
}

export const ErrorSnackbar = ({show, children}) => {
    return (
        <Snackbar bg="#f22c2c" show={show}>{children}</Snackbar>
    )
}