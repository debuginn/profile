const bodyBgs = [];
bodyBgs[0] = "https://image.debuginn.cn/202303120016035.jpeg";
bodyBgs[1] = "https://image.debuginn.cn/202303120014022.jpeg";
bodyBgs[2] = "https://image.debuginn.cn/202303120017184.jpeg";
bodyBgs[3] = "https://image.debuginn.cn/202303120020529.jpeg";

const randomBgIndex = Math.round(Math.random() * 4);

// 输出随机的背景图
document.write('<style>body{background:url(' + bodyBgs[randomBgIndex] + ') no-repeat 50% 0; background-size: 100% ;background-attachment: fixed;background-size: cover;-webkit-background-size: cover;-o-background-size: cover;}</style>');
