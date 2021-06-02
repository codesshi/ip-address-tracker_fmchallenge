const validate = {
    hasNotOnlyDigitAndDot: /[^0-9.]/,
    hasNotOnlyHexAndColon: /[^A-Fa-f0-9:]/,
    startOrEndWithColon: /^:[A-Fa-f0-9]|[A-Fa-f0-9]:$/,
    hasMoreThanOneDoubleColon: /::.*::/,
    hasThreeOrMoreConsecutiveColon: /:{3,}/,
    hasDoubleColon: /::/,
    hasMoreThanSixColon: /(.*:){7}/,
    hasEightValidSegments: /^[A-Fa-f0-9]{1,4}(:[A-Fa-f0-9]{1,4}){7}$/
}

const isOutOfRange = (num, start, end) => {
    return (num < start || num > end);
}

const allSegmentsInRange = (segments, start, end) => {
    for (let segment of segments) {
        if (isNaN(segment) || isOutOfRange(segment, start, end))
            return false;
    }

    return true;
}

const isIPv4 = (ip) => {
    if (ip.length > 15)
        return false;

    if (validate.hasNotOnlyDigitAndDot.test(ip))
        return false;

    const segments = ip.split('.').map(el => parseInt(el));

    if (segments.length !== 4)
        return false;

    return allSegmentsInRange(segments, 0, 255);
}

const addZeroSegments = (ip) => {
    const numOfZeroSegments = (8 - ip.split(":").length) + 1;
    const zeroSegments = new Array(numOfZeroSegments).fill("0").join(":");

    return ip.replace(/\$/, zeroSegments);
}

const toPreferredFormat = (ip) => {
    ip = ip.replace(/::/, ":$:");
    ip = ip.replace(/^:|:$/g, "");

    return addZeroSegments(ip);
}

const isIPv6 = (ip) => {
    if (ip.length > 39)
        return false;

    if (validate.hasNotOnlyHexAndColon.test(ip))
        return false;

    if (validate.startOrEndWithColon.test(ip))
        return false;

    if (validate.hasMoreThanOneDoubleColon.test(ip))
        return false;

    if (validate.hasThreeOrMoreConsecutiveColon.test(ip))
        return false;

    if (validate.hasMoreThanSixColon.test(ip) && validate.hasDoubleColon.test(ip))
        return false;

    if (validate.hasDoubleColon.test(ip))
        ip = toPreferredFormat(ip);

    return validate.hasEightValidSegments.test(ip);
}

export { isIPv4, isIPv6 };