const chalk = require("chalk");

/**
 * 三体问题计算器。<br>
 *
 * 例：
 * <pre>
 * let tbc = new ThreeBodyCalc();
 * tbc.startCalc().then(() => {
 *     // 计算完成。
 * }).catch(err => {
 *     // 计算出错。
 *     console.error("calc err", err);
 * });
 * </pre>
 */
class ThreeBodyCalc {

    /**
     * 计算器版本号。 在init 函数中会被初始化。
     * @type {string}
     */
    #version

    constructor() {
        // nothing.
    }

    #init() {
        this.#version = "3.12.83";
    }

    /**
     * 打印一条日志，然后随机等待 0.5 到 1秒。
     * @param type {?"info"|"sys"|"status"} 日志的类型，如果不想指定类型，可以传入 undefined。
     * @param txt {string} 要打印的日志内容。
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

    /**
     * 返回一个睡眠指定毫秒时间的 Promise 实例。
     * @param ms {number} 要随眠的毫秒数。
     * @return {Promise<void>}
     */
    #sleep(ms) {
        return new Promise(r => {
            setTimeout(r, ms);
        });
    }

    /**
     * 获取 设备登录的用户名称。
     * @return {string}
     */
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
     * 创建一个计算任务，并返回任务id。
     * @return {string} 任务 id.
     */
    #createMission() {
        // 目前还没有代码实现任务的创建，下方直接返回任务id。
        return String(Math.random()).substring(2, 10);
    }

    /**
     * 开始处理任务。 实际上就仅仅是显示进度条。
     * @return {Promise<void>}
     */
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
     * 开始计算任务.
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
