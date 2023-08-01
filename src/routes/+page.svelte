<script>
  let disabled = true; // this prevent the input type on clicking.
  let showInput = ""; // this will store input and show all the value in input type.
  let firstOperand = ""; // this will store the first input.
  let operand = ""; // this will store the operator value when clicking the operator button add-sub-mul-div
  let secondOperand = ""; // this variable will store the second input that add-sub-mul-div to first input
  let result = ""; // this variable will store the value of result of operation
  let isAdd = true; // set to true when clicking the add button
  let isSub = true; // set to true when clicking the subtract button
  let isMul = true; // set to true when clicking the multiply button
  let isDiv = true; // set to true when clicking the division button

  // This function is use to POST a request to SSR / server.ts
  async function calculate() {
    secondOperand += showInput; // It will concat the second value to the input. So you will see your second operand.
    console.log(`operand: ${operand}`);
    console.log(`second operand value ${secondOperand}`);

    // This method is transfer the data to SSR / server.ts. It's similar to react req.body
    const response = await fetch("/server", {
      method: "POST",
      body: JSON.stringify({ firstOperand, secondOperand, operand }), // same value to the server.ts sharing same value.
      headers: {
        "content-type": "application/json",
      },
    });

    result = await response.json(); // This will get return result from server.ts in a json format.
    showInput = ""; // after click reset the value to default 0.
    showInput += result; // Now it will concat the result to show it in input type.
    console.log(`result: ${result}`);
  }
</script>

<section class="main-section">
  <div class="calculator-container">
    <div class="output-container">
      <div class="value-holder">
        <input
          class="output-value"
          type="text"
          id="input"
          value={!showInput ? firstOperand : showInput}
          {disabled}
        />
      </div>
    </div>
    <div class="btn-container">
      <div class="number-container">
        <button
          class="btn1"
          on:click={() => {
            showInput = showInput + "1";
          }}>1</button
        >
        <button
          class="btn2"
          on:click={() => {
            showInput = showInput + "2";
          }}>2</button
        >
        <button
          class="btn3"
          on:click={() => {
            showInput = showInput + "3";
          }}>3</button
        >
        <button
          class="btn4"
          on:click={() => {
            showInput = showInput + "4";
          }}>4</button
        >
        <button
          class="btn5"
          on:click={() => {
            showInput = showInput + "5";
          }}>5</button
        >
        <button
          class="btn6"
          on:click={() => {
            showInput = showInput + "6";
          }}>6</button
        >
        <button
          class="btn7"
          on:click={() => {
            showInput = showInput + "7";
          }}>7</button
        >
        <button
          class="btn8"
          on:click={() => {
            showInput = showInput + "8";
          }}>8</button
        >
        <button
          class="btn9"
          on:click={() => {
            showInput = showInput + "9";
          }}>9</button
        >
        <button
          class="btn0"
          on:click={() => {
            showInput = showInput + "0";
          }}>0</button
        >
        <button class="eqlbtn" on:click={calculate}>=</button>
        <button
          class="clear"
          on:click={() => {
            location.reload();
          }}>C</button
        >
      </div>
      <div class="operator-container">
        <button
          class="addbtn"
          on:click={() => {
            if (isAdd) {
              firstOperand += showInput;
              operand = operand + "+";
              showInput = "";
              isAdd = false;
              console.log(`first operand value ${firstOperand}`);
            } else {
              firstOperand = result;
              operand = "";
              operand = operand + "+";
              showInput = "";
              secondOperand = "";
            }
          }}>+</button
        >
        <button
          class="minbtn"
          on:click={() => {
            if (isSub) {
              if (firstOperand == "") {
                firstOperand += showInput;
                operand = operand + "-";
                showInput = "";
                isAdd = false;
                console.log(`first operand value ${firstOperand}`);
              } else if (firstOperand != "") {
                firstOperand = result;
                operand = "";
                operand = operand + "-";
                showInput = "";
                secondOperand = "";
              } else {
                console.log("Invalid inputs!");
              }
            }
          }}>-</button
        >
        <button
          class="mulbtn"
          on:click={() => {
            if (isMul) {
              if (firstOperand == "") {
                firstOperand += showInput;
                operand = operand + "*";
                showInput = "";
                isAdd = false;
                console.log(`first operand value ${firstOperand}`);
              } else if (firstOperand != "") {
                firstOperand = result;
                operand = "";
                operand = operand + "*";
                showInput = "";
                secondOperand = "";
              } else {
                console.log("Invalid inputs!");
              }
            }
          }}>x</button
        >
        <button
          class="divbtn"
          on:click={() => {
            if (isDiv) {
              if (firstOperand == "") {
                firstOperand += showInput;
                operand = operand + "/";
                showInput = "";
                isAdd = false;
                console.log(`first operand value ${firstOperand}`);
              } else if (firstOperand != "") {
                firstOperand = result;
                operand = "";
                operand = operand + "/";
                showInput = "";
                secondOperand = "";
              } else {
                console.log("Invalid inputs!");
              }
            }
          }}>/</button
        >
      </div>
    </div>
  </div>
  <div class="result-container">
    <p>First Operand: {firstOperand}</p>
    <p>Operand: {operand}</p>
    <p>Second Operand: {secondOperand}</p>
    {#if result}
      <p>Result from the server: {JSON.stringify(result)}</p>
    {/if}
  </div>
</section>

<style>
  .main-section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .calculator-container {
    border: 3px solid #000;
    border-radius: 5px;
    background-color: aliceblue;
    box-shadow: 5px 10px 0px 0px rgba(0, 0, 0, 0.75);
  }
  .output-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 317px;
    background-color: grey;
    border-bottom: 3px solid #000;
  }

  .output-value {
    text-align: end;
    height: 50px;
    width: 250px;
    border: 3px solid #000;
    font-size: 30px;
    background-color: #fff;
  }

  .btn-container {
    display: flex;
  }
  .number-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    height: 350px;
    width: 200px;
    gap: 1rem;
    padding: 1rem 1rem 1rem;
  }

  .btn1,
  .btn2,
  .btn3,
  .btn4,
  .btn5,
  .btn6,
  .btn7,
  .btn8,
  .btn9,
  .btn0 {
    display: flex;
    justify-content: space-evenly;
    padding-top: 0.5rem;
    height: 50px;
    width: 50px;
    background-color: #b2a4ff;
    box-shadow: 0px 10px 0px 0px rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    font-size: 30px;
    cursor: pointer;
  }

  .btn1:hover,
  .btn2:hover,
  .btn3:hover,
  .btn4:hover,
  .btn5:hover,
  .btn6:hover,
  .btn7:hover,
  .btn8:hover,
  .btn9:hover,
  .btn0:hover {
    background-color: #907dff;
    color: #fff;
    box-shadow: 0px 9px 0px 0px rgba(0, 0, 0, 0.75);
    border-bottom: none;
  }

  .operator-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;
    width: 50px;
    height: 350px;
    padding: 1rem 1rem 1rem;
    border-left: 3px solid #000;
  }

  .addbtn,
  .minbtn,
  .mulbtn,
  .divbtn {
    height: 50px;
    width: 50px;
    background-color: #fdf7c3;
    box-shadow: 0px 10px 0px 0px rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    cursor: pointer;
    font-size: 25px;
  }

  .eqlbtn {
    height: 50px;
    width: 50px;
    background-color: #ffdeb4;
    box-shadow: 0px 10px 0px 0px rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    cursor: pointer;
    font-size: 25px;
  }
  .clear {
    height: 50px;
    width: 50px;
    background-color: #ffb4b4;
    box-shadow: 0px 10px 0px 0px rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    cursor: pointer;
    font-size: 25px;
  }

  .addbtn:hover,
  .minbtn:hover,
  .mulbtn:hover,
  .divbtn:hover {
    background-color: #fcf29f;
    border-bottom: none;
    box-shadow: 0px 9px 0px 0px rgba(0, 0, 0, 0.75);
  }

  .eqlbtn:hover {
    background-color: #fcd096;
    border-bottom: none;
    box-shadow: 0px 9px 0px 0px rgba(0, 0, 0, 0.75);
  }

  .clear:hover {
    background-color: #fe9c9c;
    border-bottom: none;
    box-shadow: 0px 9px 0px 0px rgba(0, 0, 0, 0.75);
  }

  .result-container {
    height: 150px;
    width: 200px;
    padding: 2rem 2rem;
    background-color: antiquewhite;
    border: 1px solid lightgray;
    box-shadow: 5px 10px 0px 0px rgba(0, 0, 0, 0.75);
  }
</style>
