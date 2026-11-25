const inputValue = document.getElementById("inputValue");
const inputs = document.querySelectorAll(".inputs p");
let inputArr = Array.from(inputs).map((p) => p.innerText.trim());
const error = document.getElementById("error");
const btn = document.querySelector(".btn");
const tasks = document.getElementById("tasks");
const all = document.getElementById("all");
const active = document.getElementById("active");
const done = document.getElementById("done");

function update() {
    all.textContent = `All (${inputArr.length})`;
    const checkedBoxes = document.querySelectorAll('input[name="check"]:checked');
    done.textContent = `Done (${checkedBoxes.length})`;
    active.textContent = `Active (${inputArr.length - checkedBoxes.length})`;
}
update();

inputValue.addEventListener("input", function () {
    error.style.display = "none";
});

btn.addEventListener("click", function (event) {
    event.preventDefault();

    const input = inputValue.value.trim();


    if (inputArr.includes(input)) {
        error.style.display = 'block';
        error.textContent = "Task already taken";
        return;
    }

    if (input !== '') {
        inputArr.push(input)

        const newInput = document.createElement("div");
        newInput.className = "inputs mx-1 mb-2 d-flex justify-content-space-between task";
        newInput.innerHTML = `<p class="col text-start mt-1"><input name="check" class="ms-2 me-2" type="checkbox">
                        ${input} </p>
                    <button class="delete text-end">Delete</button>`;

        tasks.appendChild(newInput);
        inputValue.value = '';
        update();
    } else {
        error.style.display = 'block';
        error.textContent = "Please enter a task";
    }
})

tasks.addEventListener("click", function (event) {

    if (event.target.matches('input[name="check"]')) {
        update();
        return;
    }

    const deletebtn = event.target.closest(".delete");

    if (deletebtn) {
        const deleteElement = deletebtn.parentElement;
        const deleteTask = deleteElement.querySelector("p").textContent.trim();;

        inputArr = inputArr.filter((item) => item !== deleteTask);
        deleteElement.remove();
        update();
    }
})
