import './IpInfoCollapsible.css';
import {useRef} from 'react';
import icon from '../../assets/icon-arrow-black.svg';

const expand = (parent) => {
    const box = parent.firstElementChild;
    const boxHeight = box.offsetHeight;
    const list = box.children;
    let offsets = [];
    for (let i = 0; i < list.length; i++) {
        offsets.push(list[i].offsetHeight);
    }

    const collapsedHeight = offsets[2] + offsets[7];
    const scaleFactor = 1 / (boxHeight / collapsedHeight);

    box.style.setProperty("--scale", scaleFactor);
    parent.style.setProperty("--translate", -(boxHeight - collapsedHeight) + "px");
    for (let i = 0, offsetY = 0; i < list.length - 1; i++) {
        list[i].style.setProperty("--translate", -offsetY + "px");
        offsetY += offsets[i];
    }
};

const IpInfoCollapsible = (props) => {
    const collapsibleRef = useRef(null);
    const {ip, location, timezone, isp} = props.info;

    const handleClick = () => {
        expand(collapsibleRef.current)
        collapsibleRef.current.classList.toggle("open");
    }

    return (
        <div className="collapsible open" ref={collapsibleRef}>
            <dl className="collapsible-bg">
                <div className="dataItem">
                    <dt>ip address</dt>
                    <dd>{ip}</dd>
                </div>
                <hr />
                <div className="dataItem" data-pivot>
                    <dt>location</dt>
                    <dd>{location}</dd>
                </div>
                <hr />
                <div className="dataItem">
                    <dt>timezone</dt>
                    <dd>{timezone}</dd>
                </div>
                <hr />
                <div className="dataItem">
                    <dt>isp</dt>
                    <dd>{isp}</dd>
                </div>
                <div className="collapsible-btn"  onClick={handleClick}>
                    <img src={icon} alt="arrow"></img>
                </div>
            </dl>
        </div>
    );
}

export default IpInfoCollapsible;