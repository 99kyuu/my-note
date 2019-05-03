/** 旧版的做法 canvas 绘画 效果不好 */
function rippleClick(el) {
    let canvas = {},
        context = {},
        centerX = 0,
        centerY = 0,
        radius = 0,
        scale = 8,  // 这个值和扩散速度有关
        color = el.dataset.color || '#999999',
        myAinmFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
        ev = window.event || arguments.callee.caller.arguments[0];
    canvas = document.createElement('canvas');
    el.appendChild(canvas);
    canvas.style.width = canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context = canvas.getContext('2d');
    centerX = ev.offsetX;
    centerY = ev.offsetY;
    if (canvas.offsetWidth <= 60) scale = 3;
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.globalAlpha = 0.5
        context.fill();
        radius += scale;
        if (radius < canvas.width) {
            myAinmFrame(draw);
        } else if (radius >= canvas.width) {
            el.removeChild(canvas);
        }
    }
    draw();
}

/** 点击水波纹 */
function ripple() {
    /** 点击事件 */
    let event = window.event || arguments.callee.caller.arguments[0];
    /** 点击目标 */
    let target = event.target;
    /** 水波纹动画节点 */
    let ripple = target.querySelector('.ripple');
    /** 点击目标矩阵尺寸 */
    var rect = target.getBoundingClientRect();

    // 判断是否存在动画节点
    if (!ripple) {
        ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');

    let y = event.touches ? event.touches[0].pageY : event.clientY,
        x = event.touches ? event.touches[0].pageX : event.clientX;

    let top = y - rect.top - (ripple.offsetHeight / 2),
        left = x - rect.left - (ripple.offsetWidth / 2);
    // console.log(top, left);

    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';

    ripple.classList.add('show');
}

/** 创建按钮 */
function createButton() {
    /** 按钮列表 */
    let listNode = utils.find('.button-list');
    /** 是否移动端 */
    let isMobile = utils.checkMobile();

    for (let i = 0; i < 11; i++) {
        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = 'BUTTON-' + (i + 1);
        listNode.appendChild(button);

        if (isMobile) {
            button.addEventListener('touchstart', ripple);
        } else {
            button.addEventListener('mousedown', ripple);
        }
    }
}
createButton();
