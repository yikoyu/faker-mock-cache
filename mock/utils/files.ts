import { resolve } from "path";
import fs from "fs/promises";

function checkDirOrFile(path: string) {
  return new Promise<boolean>((resolve, reject) => {
    fs.access(path)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
}

export async function createMockDataCache<T>(name: string, data: T[]) {
  const cachePath = resolve(process.cwd(), "node_modules", ".cache");
  const mockPath = resolve(cachePath, "mock");
  const dataPath = resolve(mockPath, `${name}.json`);

  const CacheStatus = await checkDirOrFile(cachePath);
  if (!CacheStatus) fs.mkdir(cachePath);

  const mockStatus = await checkDirOrFile(mockPath);
  if (!mockStatus) fs.mkdir(mockPath);

  await fs.writeFile(dataPath, JSON.stringify(data, null, "\t"));
}

export async function getMockData<T>(name: string): Promise<T[]> {
  const cachePath = resolve(process.cwd(), "node_modules", ".cache");
  const mockPath = resolve(cachePath, "mock");
  const dataPath = resolve(mockPath, `${name}.json`);

  const DataStatus = await checkDirOrFile(dataPath);
  if (!DataStatus) return []

  try {
    const data = await fs.readFile(dataPath, 'utf8')

    return JSON.parse(data) as T[]
  } catch (error) {
    return []
  }
}
