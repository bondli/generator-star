## O2O_Seller PC管理后台项目 （AngularJs + Bootstrap + RequireJs）

### 构建项目前提条件

```bash
sudo npm install -g yo
sudo npm install -g grunt-cli
sudo npm install -g bower
```

### 初始化项目后要做的事情

* bower install
* npm install (为了避免报错，请先修改.npm目录的权限：sudo chmod -R 777 /User/用户名/.npm/)

### 开发流程

```bash
grunt server
```

* 新增router：

```bash
yo star:route mainpage
```

* 新增controller：

```bash
yo star:controller user
```

* 新增service：

```bash
yo star:service myService
```

* 新增view：

```bash
yo star:view user
```

### 构建

```bash
grunt build
```

### 安装ui组件

```bash
bower install git@gitlab.alibaba-inc.com:hongbang.lhb/star-ui.git
```
