const bodyBgs = [];
bodyBgs[0] = "https://image.debuginn.cn/202303120016035.jpeg"; // 日出龙泽
bodyBgs[1] = "https://image.debuginn.cn/202303120014022.jpeg"; // 京西隧道
bodyBgs[2] = "https://image.debuginn.cn/202303120017184.jpeg"; // 雁栖步道
bodyBgs[3] = "https://image.debuginn.cn/202303120020529.jpeg"; // 鼓楼大街
bodyBgs[4] = "https://image.debuginn.cn/202303120018416.jpeg"; // 徒步凤凰岭
bodyBgs[5] = "https://image.debuginn.cn/202303120018147.jpeg"; // 鱼鳞云层
bodyBgs[6] = "https://image.debuginn.cn/202305162149771.jpg";  // 飞上云霄
bodyBgs[7] = "https://image.debuginn.cn/202305162151707.jpg";  // 洱海的月
bodyBgs[8] = "https://image.debuginn.cn/202305162151707.jpg";  // 洱海的月
bodyBgs[9] = "https://image.debuginn.cn/202305162152763.jpg";  // 和她她她
bodyBgs[10] = "https://image.debuginn.cn/202305162152732.jpg"; // 松赞林寺
bodyBgs[11] = "https://image.debuginn.cn/202305162153714.jpg"; // 滇池海鸥
bodyBgs[12] = "https://image.debuginn.cn/202305162153417.jpg"; // 蓝月谷
bodyBgs[13] = "https://image.debuginn.cn/202305162154852.jpg"; // 玉龙雪山
bodyBgs[14] = "https://image.debuginn.cn/202305162154677.jpg"; // 大冰的小屋
bodyBgs[15] = "https://image.debuginn.cn/202305162155271.jpg"; // 小狗老板
bodyBgs[16] = "https://image.debuginn.cn/202305162155529.jpg"; // 苍山的云

// 输出随机的背景图
const randomBgIndex = Math.round(Math.random() * (bodyBgs.length - 1));
$("body").css({
    "background": 'url(' + bodyBgs[randomBgIndex] + ') no-repeat 50% 0',
    "background-attachment": "fixed",
    "background-size": "cover",
    "-webkit-background-size": "cover;-o-background-size: cover"
})