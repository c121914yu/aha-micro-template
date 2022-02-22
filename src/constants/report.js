/* 埋点记录 */
const USER = '001'
const PROJECT = '002'
const OPERATION = '003'
const EXPLOIT = '004'
const ADMIN = '005'

export const RP_LOGIN = '000000' // 登录

export const RP_FEEDBACK = `${ USER }000` // 处理反馈
export const RP_BIN_LOGIN = `${ USER }001` // 禁止登录
export const RP_PUT_USER = `${ USER }002` // 更新用户信息

export const RP_CHECK_COMP_PROJECT = `${ PROJECT }000` // 审核比赛项目
export const RP_CHECK_COMP_FILE = `${ PROJECT }001` // 审核比赛项目文件
export const RP_DEL_COMP_PROJECT = `${ PROJECT }002` // 删除比赛项目
export const RP_CHECK_CLASS_PROJECT = `${ PROJECT }003` // 检查课设项目
export const RP_CHECK_CLASS_FILE = `${ PROJECT }004` // 检查课设项目文件
export const RP_DEL_CLASS_PROJECT = `${ PROJECT }005` // 删除课设项目

export const RP_SLIDECARD = `${ OPERATION }000` // 轮播图
export const RP_ACTIVITY = `${ OPERATION }001` // 活动
export const RP_NOTICE = `${ OPERATION }002` // 公告
export const RP_COMP_INFO = `${ OPERATION }003` // 比赛信息
export const RP_SYS_INFORMS = `${ OPERATION }004` // 系统通知

export const RP_ADMIN = `${ ADMIN }000` // 管理员配置

