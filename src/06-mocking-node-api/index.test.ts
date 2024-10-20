// Uncomment the code below and write your tests
import fs from 'node:fs';
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

const timeout = 100;
const callback = jest.fn();

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout + 10);
    // expect(callback).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout);

    expect(setInterval).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout * 5);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const mockedFilePath = 'test/mockedFile.txt';
  const mockedFileContent = "I'm here";
  let mockedFsExistsSync: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(path, 'join');
    mockedFsExistsSync = jest.spyOn(fs, 'existsSync');
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(mockedFileContent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockedFilePath);

    expect(path.join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    mockedFsExistsSync.mockReturnValue(false);

    await expect(readFileAsynchronously(mockedFilePath)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockedFsExistsSync.mockReturnValue(true);

    await expect(readFileAsynchronously(mockedFilePath)).resolves.toBe(
      mockedFileContent,
    );
  });
});
