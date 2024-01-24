export function createQueryString(params: object) {
    return (
        "?" +
        Object.keys(params)
            .reduce((strings, key) => {
                if (params[key] != null) {
                    strings.push(key + "=" + params[key]);
                }

                return strings;
            }, [])
            .join("&")
    );
}
