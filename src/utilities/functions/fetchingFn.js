export const fetchData = (data) => {
    return new Promise((resolve, reject) => {
        if (data.length > 0) {
            setTimeout(() => {
                resolve(data)
            }, 200);
        } else {
            reject(new Error("There is no data"))
        }
    })
}

export const fetchItem = (p) => {
    return new Promise((resolve, reject) => {
        if (p) {
            setTimeout(() => {
                resolve(p);
            }, 1000);
        } else {
            reject(new Error("There is no data."))
        }
    });
}

export const getCountries = async () => {
    let data = await fetch("https://restcountries.com/v3.1/all")
    let response = await data.json();

    return response.map( country => ({
        name: country.name.common,
        flag:country.flags.png,
        code: country.cca2
    }));
}