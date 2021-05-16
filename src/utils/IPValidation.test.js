import { isIPv4, isIPv6 } from './IPValidation';

it("validate ip address", () => {
    expect(isIPv4("8.8.8.8")).toEqual(true);
    expect(isIPv4("0.0.0.0")).toEqual(true);
    expect(isIPv4("8.8.hw.21")).toEqual(false);
    expect(isIPv4("8.8.321.21")).toEqual(false);
    expect(isIPv4("8.8.31.21.32")).toEqual(false);
    expect(isIPv4("8.8.-31.21")).toEqual(false);
    expect(isIPv4("8.8.21.")).toEqual(false);

    expect(isIPv6("2001:db8::2:1")).toEqual(true);
    expect(isIPv6("2001:0db8::0001:0000")).toEqual(true);
    expect(isIPv6("2001:0db8::t0001:0000")).toEqual(false);
    expect(isIPv6("2001:0db8::0001::0000")).toEqual(false);
    expect(isIPv6("2001:0db8:")).toEqual(false);
    expect(isIPv6("::")).toEqual(true);
    expect(isIPv6("::1")).toEqual(true);
    expect(isIPv6("2001:0db8::0001::0000:0:0")).toEqual(false);
    expect(isIPv6("2001:::0001:0000:0:0")).toEqual(false);
    expect(isIPv6("2001::::0001:0000:0:0")).toEqual(false);
    expect(isIPv6("2001:0db8::0001:0000:0:0:0")).toEqual(false);
});