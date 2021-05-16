import './IpInfo.css';

const IpInfo = (props) => {
    const {ip, location, timezone, isp} = props.info;

    return (
        <dl>
            <dt>ip address</dt>
            <dd>{ip}</dd>
            <dt>location</dt>
            <dd>{location}</dd>
            <dt>timezone</dt>
            <dd>{timezone}</dd>
            <dt>isp</dt>
            <dd>{isp}</dd>
        </dl>
    );
}

export default IpInfo;