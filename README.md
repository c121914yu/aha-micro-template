# Aha 微前端脚手架模板

## 运行说明

1. npm install vue-cli -g  全局安装vue-cli(已安装的不必重复)
2. npm install aha-micro-cli -g 确保全局安装了aha-micro-cli脚手架
3. npm install 安装所有依赖
4. npm run dev 运行开发环境，会跳出多选列表选择运行项目。
5. npm run build 项目打包，会跳出多选列表选择。
6. npm run deploy 简单的本地自动部署

## 配置说明

### 保证入口路径
子项目路径为src/entry/*  
*会被作为脚手架的唯一标识  

### micro-config.js
主要给脚手架读取使用，参考备注，不能删除  

### 子项目config.json
```json
"title": "Aha口袋管理系统", // 浏览器title
"name": "基座", // 选择运行时会提示的名字
"port": 4000, // 本地开发端口号
"checked": true, // 运行时是否被默认选中
"deferJs": [], // 延迟执行的js
"js": [], // 同步执行js
"css": [] // 子项目css
```

## 注意事项
 
1. 支持本地同时运行多个子项目, 建议同时开启基座  
2. 编译阶段希望打印内容，需要包含params字段,例如console.log("param", val)  
3. 保证子项目文件夹完整性，必须包含components, pages,如果文件夹为空可以加个空文件，否则不会被git提交  

## 提交规范

commit的几种类型选项，如下：不必全部，但起码一个. 不必换行，不同类型分号隔开。  
例如： git commit -m "ci: 增加提交规范"    
feat: 新功能  
fix: Bug 修复  
docs: 文档更新  
style: 样式修改  
refactor: 代码重构  
perf: 性能优化  
test: 测试更新  
build: 构建系统或者包依赖更新  
ci: CI 配置，脚本文件等更新  
chore: 非 src 或者 测试文件的更新  
revert: commit 回退  