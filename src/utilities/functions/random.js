const functions = {

    shuffleArray: function shuffleArray(array) {
        const shuffledArray = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];

            for (let k = shuffledArray[i]?.answers?.length - 1; k > 0; k--) {
                const l = Math.floor(Math.random() * (k + 1));
                [shuffledArray[i].answers[k], shuffledArray[i].answers[l]] = [shuffledArray[i].answers[l], shuffledArray[i].answers[k]];
            }
        }

        return shuffledArray;

    },
    toTitleCase: (string) => {
        return string.split("")[0].toUpperCase() + string.split("").slice(1).join("");
    },
    calculateSubtotal: (cart)=> cart.reduce((acc, item) => acc += (item.price * item.quantity), 0).toFixed(2)

}

export default functions;