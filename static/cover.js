const bodyBgs = [];
bodyBgs[0] = "https://image.debuginn.cn/202303120016035.jpeg"; // 日出龙泽
bodyBgs[1] = "https://image.debuginn.cn/202303120014022.jpeg"; // 京西隧道
bodyBgs[2] = "https://image.debuginn.cn/202303120017184.jpeg"; // 雁栖步道
bodyBgs[3] = "https://image.debuginn.cn/202303120020529.jpeg"; // 鼓楼大街
bodyBgs[4] = "https://image.debuginn.cn/202303120018416.jpeg"; // 徒步凤凰岭
bodyBgs[5] = "https://image.debuginn.cn/202303120018147.jpeg"; // 鱼鳞云层

// 输出随机的背景图
const randomBgIndex = Math.round(Math.random() * 6);
document.write('<style>body{background:url(' + bodyBgs[randomBgIndex] + ') no-repeat 50% 0; background-size: 100% ;background-attachment: fixed;background-size: cover;-webkit-background-size: cover;-o-background-size: cover;}</style>');
