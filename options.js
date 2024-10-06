/*
 * Author: fasion
 * Created time: 2022-08-25 14:15:10
 * Last Modified by: fasion
 * Last Modified time: 2022-08-25 14:50:11
 */

// 放置颜色选择按钮的容器
const buttonContainer = document.getElementById("buttonDiv");
// 当前选中按钮的类名
const selectedClassName = "current";
// 可供选择的颜色
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// 按钮点击回调函数
function handleButtonClick(event) {
    // 根据类名找出上次点击的按钮
    let last = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    // 如果上次点击按钮跟本次点击一样，无须处理
    if (last && last === event.target) {
        return;
    }

    // 取出被点击按钮对应的颜色，并保存到storage
    const color = event.target.dataset.color;
    chrome.storage.sync.set({ color });

    // 将表示点击状态的类名，从上次按钮移除，并添加到本次按钮
    last.classList.remove(selectedClassName);
    event.target.classList.add(selectedClassName);
}

// 为每种颜色添加一个按钮
function constructOptions(buttonColors) {
    // 从storage中取出当前保存的背景色
    chrome.storage.sync.get("color", (data) => {
        const currentColor = data.color;

        // 遍历每种可供选择的颜色
        for (const buttonColor of buttonColors) {
            // 创建一个按钮节点
            const button = document.createElement("button");
            // 设置按钮颜色，并保存颜色值
            button.style.backgroundColor = buttonColor;
            button.dataset.color = buttonColor;

            // 如果按钮颜色刚好是当前保存的背景色，加上类名表示选择
            if (buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }

            // 为按钮添加回调函数，点击按钮就执行上一个函数
            button.addEventListener("click", handleButtonClick);
            // 将按钮加到div容器
            buttonContainer.appendChild(button);
        }
    });
}

// 执行函数生成颜色选择按钮
constructOptions(presetButtonColors);