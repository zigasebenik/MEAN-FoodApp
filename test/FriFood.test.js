const { exec } = require("child_process");
const { describe, it, after, before, context } = require("mocha");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const expect = require("chai").expect;

/**
 * URL adresses
 */
// let appUrl = "http://localhost:8081/";
let appUrl = "https://frifood-2019.herokuapp.com/";
let seleniumUrl = "http://localhost:4445/wd/hub";

/**
 * Error handling
 */
process.on("unhandledRejection", (error) => {
    console.log(error);
});

(async function FriFood() {
    let browser, jwtToken;

    let waitForLoad = async (browser, casVS, xpath) => {
        await browser.wait(function() {
            return browser.findElements(By.xpath(xpath)).then(elements => {
                return elements[0];
            });
        }, casVS * 1000, `The page did not load in ${casVS} seconds.`);
    };

    try {
        browser = new Builder()
            .forBrowser("chrome")
            .setChromeOptions(new chrome.Options()
                .addArguments("start-maximized")
                .addArguments("disable-infobars")
                .addArguments("allow-insecure-localhost")
                .addArguments("allow-running-insecure-content")
            )
            .usingServer(seleniumUrl)
            .build();


        describe("Registration and login of a new user", async function() {
            this.timeout(30000);
            before(async function() {
                await browser.get(appUrl);
            });
            //
            // if (appUrl === 'https://frifood-2019.herokuapp.com/') {
            //     it("Open /db", async function() {
            //         let url = appUrl + '/db';
            //         before(async function() {
            //             await browser.get(url);
            //         });
            //
            //         let button = await browser.wait(until.elementLocated(
            //             By.id("dropButton")
            //         ));
            //         await expect(button).to.not.be.empty;
            //         await button.click();
            //
            //         let button2 = await browser.wait(until.elementLocated(
            //             By.id("fillButton")
            //         ));
            //         await expect(button2).to.not.be.empty;
            //         await button2.click();
            //     });
            // } else {
            //     // implement local
            // }
            // this.timeout(30000);
            // before(async function() {
            //     await browser.get(appUrl);
            // });
            it("Open dropdown", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.id("navbarDropdown")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Go to register page", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.xpath("//a[contains(text(), 'REGISTRACIJA')]")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Input data and register", async function() {
                let name = await browser.wait(until.elementLocated(By.id('name')));
                await expect(name).to.not.be.empty;
                await name.sendKeys("David");

                let surname = await browser.wait(until.elementLocated(By.id('surname')));
                await expect(surname).to.not.be.empty;
                await surname.sendKeys("Kralj");

                let email = await browser.wait(until.elementLocated(By.id('email')));
                await expect(email).to.not.be.empty;
                await email.sendKeys("random.email@gmail.com");

                let passwd1 = await browser.wait(until.elementLocated(By.id('passwd1')));
                await expect(passwd1).to.not.be.empty;
                await passwd1.sendKeys("12345");

                let passwd2 = await browser.wait(until.elementLocated(By.id('passwd2')));
                await expect(passwd2).to.not.be.empty;
                await passwd2.sendKeys("12345");

                let path = await browser.wait(until.elementLocated(
                    By.id('register')
                ));
                await expect(path).to.not.be.empty;
                await path.click();
            });

            it("Open dropdown", async function() {
                let url1 = await browser.wait(until.elementLocated(
                    By.id('link-front')
                ));
                await expect(url1).to.not.be.empty;
                await url1.click();

                let url = await browser.wait(until.elementLocated(
                    By.id("navbarDropdown")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Go to login page", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.xpath("//a[contains(text(), 'PRIJAVA')]")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Input data and login", async function() {
                let email = await browser.wait(until.elementLocated(By.id('email')));
                await expect(email).to.not.be.empty;
                await email.sendKeys("random.email@gmail.com");

                let passwd = await browser.wait(until.elementLocated(By.id('passwd')));
                await expect(passwd).to.not.be.empty;
                await passwd.sendKeys("12345");

                let path = await browser.wait(until.elementLocated(
                    By.id('signIn')
                ));
                await expect(path).to.not.be.empty;
                await path.click();

            });

            it("Stay on this page a bit more", async function() {
                let url1 = await browser.wait(until.elementLocated(
                    By.id("navbarDropdown")
                ));
                await expect(url1).to.not.be.empty;
                await url1.click();

                let url = await browser.wait(until.elementLocated(
                    By.xpath("//a[contains(text(), 'PRIJAVA')]")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });
        });

        describe("Go to restaurant list and redirect to more more info about restaurants", async function() {
            this.timeout(30000);
            before(async function() {
                await browser.get(appUrl);
            });

            it("Go to restaurant list page", async function() {
                let url1 = await browser.wait(until.elementLocated(
                    By.id('link-front')
                ));
                await expect(url1).to.not.be.empty;
                await url1.click();

                let url = await browser.wait(until.elementLocated(
                    By.id('welcome-search-button')
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Click on first restaurant to get location", async function() {
                //await brskalnik.wait(until.elementLocated(By.id("login")));
                let url = await browser.wait(until.elementLocated(
                    By.className('restaurant')
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Click on comment and rate button", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.xpath("//button[contains(text(), 'Več o restavraciji')]")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

        });

        describe("Go to comment page of first restaurant and write a comment ", async function() {
            this.timeout(30000);
            before(async function() {
                await browser.get(appUrl);
            });

            it("Go to restaurant list page", async function() {
                let url1 = await browser.wait(until.elementLocated(
                    By.id('link-front')
                ));
                await expect(url1).to.not.be.empty;
                await url1.click();

                let url = await browser.wait(until.elementLocated(
                    By.id('welcome-search-button')
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Click on first restaurant to get location", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.className('restaurant')
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Click on get more info about this restaurant", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.xpath("//button[contains(text(), 'Oceni in komentiraj')]")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Open comment window", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.id('add-comment-button')
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Set rating", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.id('ocena')
                ));
                await expect(url).to.not.be.empty;
                await url.click();

                let rate = await browser.wait(until.elementLocated(
                    By.xpath("//option[contains(text(), '3')]")
                ));
                await expect(rate).to.not.be.empty;
                await rate.click();
            });

            it("Write comment and publish it", async function() {
                let comment = await browser.wait(until.elementLocated(
                    By.id('newCommentText')
                ));
                await expect(comment).to.not.be.empty;
                await comment.sendKeys("Selenium delam v nedeljo ob 11ih, god help me! Pa komaj nekje na polovici sem...");
                let submit = await browser.wait(until.elementLocated(
                    By.xpath("//button[contains(text(), 'Objavi')]")
                ));
                await expect(submit).to.not.be.empty;
                await submit.click();
            });
        });

        describe("Go to user page and check your comments!", async function() {
            this.timeout(30000);
            before(async function() {
                await browser.get(appUrl);
            });

            it("Open dropdown", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.id("navbarDropdown")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Go to user page", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.xpath("//a[contains(text(), 'OGLED PROFILA')]")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });
        });

        describe("Go home, check restaurants again and sign out", async function() {
            this.timeout(30000);
            before(async function() {
                await browser.get(appUrl);
            });

            it("Go to home page (if not there)", async function() {
                let url1 = await browser.wait(until.elementLocated(
                    By.id('link-front')
                ));
                await expect(url1).to.not.be.empty;
                await url1.click();
            });

            it("Lets go check the restaurants again (maybe we find sth new)", async function() {
                let rst = await browser.wait(until.elementLocated(
                    By.id('welcome-search-button')
                ));
                await expect(rst).to.not.be.empty;
                await rst.click();

                let url = browser.wait(until.elementLocated(
                    By.className('restaurant')
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Open dropdown", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.id("navbarDropdown")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });

            it("Sign out", async function() {
                let url = await browser.wait(until.elementLocated(
                    By.xpath("//a[contains(text(), 'ODJAVA')]")
                ));
                await expect(url).to.not.be.empty;
                await url.click();
            });
        });

    } catch (error) { console.log(new Error(error.message));
    } finally {}
})();