const validate = {
    hasForbiddenChars: /[^A-Za-z0-9\-]/,
    hasForbiddenHyphenPosition: /^\-|\-$/,
    hasAlpha: /[A-Za-z\-]/,
    hasUnicodeChars: /[^\x00-\x7f]/
}

const toAscii = (domain) => {
    domain = domain.normalize("NFC");

    try {
        return new URL(`http://${domain}`).host;
    }
    catch (err) {
        return domain;
    }
}

const lastElement = (array) => {
    if (Array.isArray(array))
        return array[array.length - 1];

    throw "[ERR] Passed argument is not an Array";
}

const isValidLabel = (label) => {
    // a label can contain a number of octets between 1 and 63
    if (label.length === 0 || label.length > 63)
        return false;

    // label can contain only LDH (letters, digits, hyphen)
    if (validate.hasForbiddenChars.test(label))
        return false;

    // hyphen can't be at the beggining or at the end of a label
    if (validate.hasForbiddenHyphenPosition.test(label))
        return false;

    return true;
}

const isValidTldLabel = (label) => {
    // a TLD (Top Level Domain) label can't contain only digits
    if (validate.hasAlpha.test(label))
        return isValidLabel(label);

    return false;
}

const isDomain = (domain) => {
    if (typeof domain !== 'string')
        return false;
        
    // domain name can't be more than 255 characters
    if (domain.length === 0 || domain.length > 255)
        return false;

    // domain name containing Unicode chars must be converted to ascii
    if (validate.hasUnicodeChars.test(domain))
        domain = toAscii(domain);

    const labels = domain.split(".");
    
    // eliminate root if present
    if (lastElement(labels) === "")
        labels.pop();

    // validate TLD (Top Level Domain) label
    if (!isValidTldLabel(labels.pop()))
        return false;

    // validate remaining labels
    for (let label of labels) {
        if (!isValidLabel(label))
            return false;
    }

    return true;
}

export default isDomain;