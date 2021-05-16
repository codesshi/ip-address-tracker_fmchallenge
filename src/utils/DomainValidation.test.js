import isDomain from './DomainValidation';

it("validate domain name", () => {
    expect(isDomain("example.com")).toEqual(true);
    expect(isDomain("example.com.")).toEqual(true);
    expect(isDomain("오마이걸.com")).toEqual(true);
    expect(isDomain("오마이걸.com.")).toEqual(true);
    expect(isDomain("exam-ple.com")).toEqual(true);
    expect(isDomain("-example.com")).toEqual(false);
    expect(isDomain("example-.com")).toEqual(false);
    expect(isDomain("example.999")).toEqual(false);
    expect(isDomain(".example.com")).toEqual(false);
    expect(isDomain("example.com/")).toEqual(false);
    expect(isDomain({num: 1})).toEqual(false);
});