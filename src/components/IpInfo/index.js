import './IpInfo.css';

const IpInfo = (props) => {
    const {ip, location, timezone, isp} = props.info;

    return (
        <dl>
            <div className="dataItem">
                <dt>ip address</dt>
                <dd>{ip}</dd>
            </div>
            <hr />
            <div className="dataItem">
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
        </dl>
    );
}

export default IpInfo;