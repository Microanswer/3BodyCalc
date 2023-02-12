const chalk = require("chalk");
class ThreeBodyCalc {

    #version

    constructor() {
        // nothing.
    }

    #init() {
        this.#version = "3.12.83";
    }

    /**
     *
     * @param type {?"info"|"sys"|"status"}
     * @param txt
     * @return {Promise<void>}
     */
    async #log(type, txt) {
        if (type === "info") {
            txt = `  ${chalk.green("[INFO]")}   ${txt}`;
        } else if (type === "sys") {
            txt = `  ${chalk.yellow("[SYS]")}    ${txt}`;
        } else if (type === "status") {
            txt = `${chalk.blue("[STATUS]")}   ${txt}`;
        }
        console.log(txt);
        await this.#sleep(Math.ceil(Math.random()*1000 + 500));
    }

    #sleep(ms) {
        return new Promise(r => {
            setTimeout(r, ms);
        });
    }

    #getUserName() {
        let username = process.env.USERNAME;
        if (!username) {
            let homepath = process.env.HOMEPATH || process.env.USERPROFILE;
            if (homepath) {
                username = homepath.split(/[\\/]/).pop().trim();
            }
        }
        return username;
    }

    /**
     * create mission, return mission id.
     *
     * return {string} mission id.
     */
    #createMission() {
        return String(Math.random()).substring(2, 10);
    }

    async #proceing() {
        process.stdout.write('\x1b[?25l')
        for (let i = 0; i <= 100; i++) {
            process.stdout.write("  Proc:: ");
            let j = 0;
            for (; j <= i; j++) {
                process.stdout.write(chalk.white("\u2588"));
            }
            for (; j <= 100; j++) {
                process.stdout.write(chalk.bgGray(" "));
            }
            process.stdout.write(" " + chalk.white(i + "%\r"));
            await this.#sleep(Math.ceil(Math.random() * 100));
        }
        process.stdout.write('\x1b[?25h\n')
    }

    /**
     * start calc.
     *
     * @return {Promise<void>}
     */
    async startCalc() {
        this.#init();

        await this.#log(undefined, "***********************************");
        await this.#log("info", "用户ID : " + this.#getUserName());
        await this.#log("sys", "计算任务已提交");
        await this.#log("info", "任务ID : " + this.#createMission());
        await this.#log("sys", "申请节点 : node00001-node08192");
        await this.#log("sys", "优先级 : 最高\n");
        await this.#log("status", "等待计算资源\n");
        await this.#log("sys", "资源申请成功");
        await this.#log("sys", "初始化计算任务......");
        await this.#log("status", "计算已启动\n");
        await this.#log(undefined, "------------------------");
        await this.#log(undefined, "  3bodyCalc v " + this.#version);
        await this.#proceing();
        await this.#log(undefined, "------------------------");
        await this.#log("sys", "计算已完成");
    }
}

module.exports = ThreeBodyCalc;
