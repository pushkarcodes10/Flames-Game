document.addEventListener('DOMContentLoaded', () =>    {
    const boyInput = document.getElementById('boy-name')
    const girlInput = document.getElementById('girl-name')
    const showResult = document.getElementById('showResultBtn')
    const displayResult = document.getElementById('result')
    const resetButton = document.getElementById('reset-btn')

    const meanings = {
        F: "Friends 🤝",
        L: "Love ❤️",
        A: "Affection 💞",
        M: "Marriage 💍",
        E: "Enemies 💔",
        S: "Siblings 👫"
    };

    showResult.addEventListener('click', (e) => {
        e.preventDefault()

        let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
        let index = 0

        let boyName = boyInput.value.toLowerCase().trim()
        let girlName = girlInput.value.toLowerCase().trim()
        const validName = /^[a-zA-Z]+$/

        if (!validName.test(boyName) || (!validName.test(girlName))) {
            displayResult.textContent = "Names must contain only letters!";
            return
        }

        let boyArr = boyName.split('');
        let girlArr = girlName.split('');

        for (let i = 0; i < boyArr.length; i++) {
            const matchIndex = girlArr.indexOf(boyArr[i]);

            if (matchIndex !== -1)   {
                boyArr[i] = ""
                girlArr[matchIndex] = ""

            }
        }
        const count = (boyArr.join("") + girlArr.join("")).length
        while (flames.length > 1) {
            index = (index + count - 1) % flames.length
            flames.splice(index, 1)
        }

        let result = flames[0]
        displayResult.textContent = "Calculating result... 🔄"

        setTimeout(() => {
            displayResult.textContent = meanings[result];
            resetButton.classList.remove('hidden')
            boyInput.setAttribute('disabled', '')
            girlInput.setAttribute('disabled', '')
            showResult.disabled = true
        }, 3000)

    });

    resetButton.addEventListener('click', () => {
        boyInput.value = ""
        girlInput.value = ""
        displayResult.textContent = ""
        boyInput.removeAttribute('disabled')
        girlInput.removeAttribute('disabled')
        displayResult.removeAttribute('disabled')
        resetButton.classList.add('hidden')
        showResult.disabled = false
    });
});