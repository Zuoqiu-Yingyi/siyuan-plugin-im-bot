// Copyright (C) 2026 Zuoqiu Yingyi
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/* 上线与下线通知中附带的运行环境, QQ、Telegram 与飞书共用 */

import type * as kernel from "siyuan/kernel";

/* 发送通知的设备、工作空间与版本; 没有取得的项为空字符串 */
export interface INoticeEnvironment {
    deviceName: string; // 设备名称
    deviceId: string; // 设备 ID, 与前端的 siyuan.config.system.id 相同
    workspace: string; // 工作空间名称, 即工作空间目录的名称
    kernelVersion: string; // 思源内核版本
    pluginVersion: string; // im-bot 插件版本
}

/* 运行环境的文本, {{1}} 至 {{5}} 依次为设备名称、设备 ID、工作空间名称、思源内核版本与插件版本 */
const DEFAULT_ENVIRONMENT_TEXT = "Device: {{1}}\nDevice ID: {{2}}\nWorkspace: {{3}}\nSiYuan kernel version: {{4}}\nim-bot version: {{5}}";

/**
 * 通知的全文: 通知文本之后逐行列出运行环境, 没有取得的项显示为 -
 * @param siyuan - 内核插件全局对象, 用于读取界面文本
 * @param text - 通知文本
 * @param environment - 发送通知的运行环境
 */
export function noticeContent(siyuan: kernel.ISiyuan, text: string, environment: INoticeEnvironment): string {
    const template = (siyuan.plugin.i18n?.notices?.environment as string | undefined) || DEFAULT_ENVIRONMENT_TEXT;
    const values = [
        environment.deviceName,
        environment.deviceId,
        environment.workspace,
        environment.kernelVersion,
        environment.pluginVersion,
    ];
    // 用函数替换: 设备名称与工作空间名称中的 $ 不能被当作替换模式
    const details = template.replace(/\{\{([1-5])\}\}/g, (_match, index: string) => values[Number(index) - 1] || "-");
    return `${text}\n${details}`;
}
