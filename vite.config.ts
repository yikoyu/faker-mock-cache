import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import minimatch from 'minimatch'
import { viteMockServe } from "vite-plugin-mock";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "mock",
        supportTs: true,
        watchFiles: true,
        logger: true,
        injectCode: `
        import { setupProdMockServer } from '../mock/_createProdMockServer';
        setupProdMockServer();
      `,
        ignore: (fileName: string) => {
          // 取消匹配 data 文件和 type 文件
          const pattens = ["**/{type,types,typings,typing}.ts", "utils/**/*.ts", "data/**/*.ts", "types/**/*.ts", "**/*.d.ts", "**/data.ts", "_*.ts"];
          const find = pattens.find((patten) => minimatch(fileName, patten));
          return find ? false : true;
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@mock": resolve(__dirname, "mock"),
      },
    },
  }
});

