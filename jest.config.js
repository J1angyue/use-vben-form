import { resolve } from 'path'

const config = {
  rootDir: resolve(process.cwd()),
  moduleFileExtensions: ['vue', 'ts', 'js'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupJest.ts'],
  preset: 'ts-jest',
  // testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@t/(.*)$': '<rootDir>/src/types/$1',
    '@u/(.*)$': '<rootDir>/src/utils/$1',
    '@c/(.*)$': '<rootDir>/src/components/$1',
    '@e/(.*)$': '<rootDir>/src/experiments/$1'
  },
  transform: {
    '^.+\\.vue$': 'vue-jest', // vue 文件用 vue-jest 转换
    '^.+\\.tsx?$': 'ts-jest'
  },
  // 匹配 src/tests 目录下的 .test.ts 文件
  testRegex: 'src/tests/.*\.test\.ts$',
}

export default config