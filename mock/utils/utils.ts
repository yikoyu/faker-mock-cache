import { fill, isArray, isNumber, map } from "lodash-es";
import dayjs from "dayjs";
import path from "path";
import { execSync } from "child_process";
import qs from "qs";
import { faker, Faker } from "@faker-js/faker";

import type { IncomingMessage } from "http";

export function parseRequest(req: IncomingMessage): Promise<Recordable> {
  return new Promise((resolve) => {
    const contentType = (req.headers["content-type"] || "").toLowerCase();
    let body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });
    req.on("end", function () {
      let data: any = null;
      if (contentType.includes("json")) {
        try {
          data = JSON.parse(body);
        } catch (err) {
          console.log(err);
        }
      } else if (contentType.includes("form")) {
        try {
          data = qs.parse(body);
        } catch (err) {
          console.log(err);
        }
      } else {
        data = body;
      }
      resolve(data);
      return;
    });
  });
}

/**
 * @description 拼接api前缀
 * @export
 * @param {string} url
 */
export function getUrl(url: string) {
  return `${process?.env?.VITE_API_BASE_URL || "/api/v1"}${url}`;
}

/**
 * 获取七牛云 upToken
 * @export
 * @returns
 */
export function getQiniuToken() {
  return new Promise((resolve, reject) => {
    try {
      console.log("object :>> ", __dirname);
      const file = path.join(process.cwd(), "./mock/utils/qiniu.ts");
      const token = execSync(`npx esno ${file}`, { encoding: "utf-8" });
      if (!token) {
        reject(token);
        return;
      }

      resolve(token.replace(/[\r\n]/g, ""));
    } catch (error) {
      reject(error);
    }
  });
}

interface FakerItem {
  faker: Faker;
  nowDate: string;
  i: number;
}

/**
 * @description 创建假数据方法
 * @export
 * @template T
 * @param {(item: FakerItem) => T} hook
 * @param {(number | [number, number])} [number]
 * @return {*}  {T[]}
 */
export function fakerArray<T>(hook: (item: FakerItem) => T, number?: number | [number, number]): T[] {
  let num: number;

  if (isArray(number)) {
    const [min, max] = number;
    num = faker.datatype.number({ min, max });
  } else if (isNumber(number)) {
    num = number;
  } else {
    num = faker.datatype.number({ min: 5, max: 25 });
  }

  return map(fill(Array<T>(num), undefined as unknown as T), (_item, index) =>
    hook({
      faker,
      nowDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      i: index,
    })
  );
}

/**
 * @description 创建基础 api 假数据方法
 * @export
 * @template T
 * @param {(item: FakerItem) => T} hook
 * @param {(number | [number, number])} [number]
 * @return {*}  {T[]}
 */
export function createFakerArray<T extends BaseApiQuery = BaseApiQuery>(
  name: string,
  hook: (item: FakerItem) => Omit<T, keyof BaseApiQuery>,
  number?: number | [number, number]
): T[] {
  const cache = global.store.get(name);
  console.log("name :>> ", name, global.store.has(name));
  if (global.store.has(name) && cache) return cache;

  const data = fakerArray<T>((item) => {
    return {
      id: item.i + 1,
      createDate: item.nowDate,
      remarks: item.faker.random.words(6),
      ...hook(item),
    } as T;
  }, number);

  global.store.set(name, data);

  return data;
}

