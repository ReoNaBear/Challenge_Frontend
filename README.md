# 挑戰任務
採前後分離的開發模式，在一個月內打造的簡易打卡平台。

<a href="https://github.com/ReoNaBear/Challenge_Backend">後端repo</a> 
 | <a href="https://d3rdy47yp5tkip.cloudfront.net/">demo</a> 

## 功能介紹

  * 提供使用者登入、登出及註冊帳號功能
    * 網站具備JWT驗證功能 
    * 密碼輸錯五次鎖帳號，管理員才能解鎖
  * 提供使用者打卡
    * 按鈕打卡- 限制gps定位(400m以內)
    * QRcode打卡- 限制admin才能產生QR碼
  * 提供使用者功能
    * 使用者可以修改個人密碼
    * 使用者可以看自己今日打卡進度
    * 使用者可以看自己本月已缺席天數
  * 提供後台管理員功能
    * 可以瀏覽所有使用者資訊(名字,工號,前一個工作日打卡情況,是否封鎖)
    * 可以封鎖/解除封鎖一般使用者
    * 可以更改前一日出勤情況
    * 可以更改使用者密碼

## 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:
```
git clone https://github.com/ReoNaBear/Challenge_Frontend.git
```

2.初始

```
cd Challenge_Frontend //切至專案資料夾
npm install  //安裝套件
(If error npm not found! please install latest node.js first)
```

### Lints and fixes files
```
npm run lint --fix
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Demo及後端種子資料資訊
1.後台帳號
  ```
  account: admin 
  email: admin@titan-test.com.tw
  password: tiadmin
  isAdmin: 1
  ```
2.前台帳號
  ```
  account: user1
  email: user1@titan-test.com.tw
  password: titaner
  isAdmin: 0
  ```

### 頁面參考
![image](https://user-images.githubusercontent.com/89585478/211473145-2141f105-fdc8-48ce-b413-bdd5cafb22b9.png)

![image](https://user-images.githubusercontent.com/89585478/211473332-a1a78111-6b12-4a34-9cf6-00c02adbfc15.png)
