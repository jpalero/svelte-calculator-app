// Import the json form svelte kit for you to use json.
import { json } from '@sveltejs/kit';

// This http fuction that return and respond to the client side request.
export async function POST({ request }){
    // This is the varaiable same as the client page that store the value of the inputs (firstOperand, secondOperand, operand)
    const { firstOperand, secondOperand, operand } = await request.json();

    // This return the inputs back to the main pages then convert the strings into numbers then perform the math opration
    return json(operand == '+' ? Number(firstOperand) + Number(secondOperand) : // This return an addition if the operand use or click addbtn on client side
    operand == '-' ? Number(firstOperand) - Number(secondOperand) : // This return an subtraction if the operand use or click  subbtn on client side
    operand == '*' ? Number(firstOperand) * Number(secondOperand) : // This return an multiplication if the operand use or click mulbtn button on client side
    operand == '/' ? Number(firstOperand) / Number(secondOperand) : // This return an divition if the operand use or click add divbtn on client side
    console.log("invalid operator!")); // If not of this math operation ar met. It will return an invalid operator!
}
