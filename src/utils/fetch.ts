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

/* 内核插件调用本机内核的接口 */

import type * as kernel from "siyuan/kernel";

/**
 * siyuan.client.fetch 的请求选项; 已发布的 siyuan 1.2.9 类型声明中还没有 FormData 请求体、timeout 与 signal。
 * FormData 编码为 multipart/form-data, 没有设置 Content-Type 时内核会带上 boundary 自动设置;
 * timeout 默认 60000 ms, 0 表示不限时, 只限制到收到响应头为止; signal 中止时以它的 reason 拒绝
 */
export interface IKernelRequestInit extends Omit<kernel.IRequestInit, "body"> {
    body?: ArrayBuffer | FormData | string;
    timeout?: number;
    signal?: AbortSignal;
}

/* 调用 siyuan.client.fetch; 响应体只能读取一次 */
export function kernelFetch(siyuan: kernel.ISiyuan, path: kernel.TRequestPath, init?: IKernelRequestInit): Promise<kernel.IFetchResponse> {
    return siyuan.client.fetch(path, init as kernel.IRequestInit | undefined);
}
