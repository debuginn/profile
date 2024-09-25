const bodyBgs = [];
bodyBgs[0] = "https://static.debuginn.com/202303120016035.jpeg"; // 日出龙泽
bodyBgs[1] = "https://static.debuginn.com/202303120014022.jpeg"; // 京西隧道
bodyBgs[2] = "https://static.debuginn.com/202303120017184.jpeg"; // 雁栖步道
bodyBgs[3] = "https://static.debuginn.com/202303120020529.jpeg"; // 鼓楼大街
bodyBgs[4] = "https://static.debuginn.com/202303120018416.jpeg"; // 徒步凤凰岭
bodyBgs[5] = "https://static.debuginn.com/202303120018147.jpeg"; // 鱼鳞云层
bodyBgs[6] = "https://static.debuginn.com/202305162149771.jpg";  // 飞上云霄
bodyBgs[7] = "https://static.debuginn.com/202305162151707.jpg";  // 洱海的月
bodyBgs[8] = "https://static.debuginn.com/202305162152763.jpg";  // 和她她她
bodyBgs[9] = "https://static.debuginn.com/202305162152732.jpg";  // 松赞林寺
bodyBgs[10] = "https://static.debuginn.com/202305162153714.jpg"; // 滇池海鸥
bodyBgs[11] = "https://static.debuginn.com/202305162153417.jpg"; // 蓝月谷
bodyBgs[12] = "https://static.debuginn.com/202305162154852.jpg"; // 玉龙雪山
bodyBgs[13] = "https://static.debuginn.com/202305162154677.jpg"; // 大冰的小屋
bodyBgs[14] = "https://static.debuginn.com/202305162155271.jpg"; // 小狗老板
bodyBgs[15] = "https://static.debuginn.com/202305162155529.jpg"; // 苍山的云
bodyBgs[16] = "https://static.debuginn.com/202312241440666.jpg"; // 夜爬东灵山
bodyBgs[17] = "https://static.debuginn.com/202312241448297.jpg"; // 伏地魔十七
bodyBgs[18] = "https://static.debuginn.com/202312241459045.jpg"; // 搁浅的布鲁维斯号
bodyBgs[19] = "https://static.debuginn.com/202312241509754.jpg"; // 青岛的浪

// 输出随机的背景图
const randomBgIndex = Math.round(Math.random() * (bodyBgs.length - 1));
$("body").css({
    "background": 'url(' + bodyBgs[randomBgIndex] + ') no-repeat 50% 0',
    "background-attachment": "fixed",
    "background-size": "cover",
    "-webkit-background-size": "cover;-o-background-size: cover"
})