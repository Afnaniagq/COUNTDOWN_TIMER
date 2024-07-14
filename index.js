#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log("-".repeat(60));
console.log(chalk.red(`\t"WELCOME TO COUNTDOWN_TIMER"`));
console.log("-".repeat(60));
const resp = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.yellow("Please enter The Amount of second"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.red("Please Enter Valid Number");
            }
            else if (input > 60) {
                return chalk.red("Seconds Must Be in 60");
            }
            else {
                return true;
            }
        }
    }
]);
let input = resp.userInput;
//FUNCTION FOR TIMER:
function startTime(value) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(initialTime);
    //FOR FIRING/REFRESHING FUNCTION AFTER EVERY 1SEC;    
    setInterval((() => {
        //FOR CURRENT TIME:        
        const currentTime = new Date();
        const timeDiffer = differenceInSeconds(intervalTime, currentTime);
        if (timeDiffer <= 0) {
            console.log(chalk.green("Timer has Expired !"));
            process.exit();
        }
        const minute = Math.floor((timeDiffer % (3600 * 24)) / 3600);
        const second = Math.floor(timeDiffer % 60);
        console.log(`${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
